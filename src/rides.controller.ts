import { Request, Response, NextFunction } from 'express';
import Logger from './lib/logger';
import { Ride } from './models';
import ridesRepository from './repository/rides.repository';
import repo from './repository/rides.repository';
import { ApiErrorEnum } from './enum';


export default class {
  static async getAllRides(req: Request, res: Response, next: NextFunction) {
    try {
      const rides: Ride[] = await repo.getAllRides();
      if (rides.length === 0) {
        return res.status(404).send({
            error_code: ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
            message: 'Could not find any rides'
        })
      }
      res.status(200).send(rides)
    } catch (err) {
      Logger.error(`${err}`)
      return res.status(500).send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
      });
    }
  }

  static async getRideById(req: Request, res: Response) {
    const rideID: string = req.params.rideID
    try {
      const ride = await ridesRepository.getRideById(rideID);
      if (!ride) {
        return res.status(404).send({
          error_code: ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
          message: 'Ride not found!'
        })
      }
      return res.status(200).send(ride).status(200);
    } catch (err) {
      Logger.error(`${err}`)
      return res.status(500).send({
        error_code: ApiErrorEnum.SERVER_ERROR,
        message: 'Unknown error'
      });
    }

  }
  
  static async createRide(req: Request, res: Response, next: NextFunction) {
    const ride: Ride = {
      startLat: Number(req.body.start_lat),
      startLong: Number(req.body.start_long),
      endLat: Number(req.body.end_lat),
      endLong: Number(req.body.end_long),
      riderName: req.body.rider_name,
      driverName: req.body.driver_name,
      driverVehicle: req.body.driver_vehicle
    } 
    try {

      if (ride.startLat < -90 || ride.startLat > 90 || ride.startLong < -180 || ride.startLong > 180) {
          return res.status(400).send({
              error_code: ApiErrorEnum.VALIDATION_ERROR,
              message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          })
      }

      if (ride.endLat < -90 || ride.endLat > 90 || ride.endLong < -180 || ride.endLong > 180) {
          return res.status(400).send({
              error_code: ApiErrorEnum.VALIDATION_ERROR,
              message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
          });
      }

      if (typeof ride.riderName !== 'string' || ride.riderName.length < 1) {
          return res.status(400).send({
              error_code: ApiErrorEnum.VALIDATION_ERROR,
              message: 'Rider name must be a non empty string'
          });
      }

      if (typeof ride.driverName !== 'string' || ride.driverName.length < 1) {
          return res.status(400).send({
              error_code: ApiErrorEnum.VALIDATION_ERROR,
              message: 'Rider name must be a non empty string'
          });
      }

      if (typeof ride.driverVehicle !== 'string' || ride.driverVehicle.length < 1) {
          return res.status(400).send({
              error_code: ApiErrorEnum.VALIDATION_ERROR,
              message: 'Rider name must be a non empty string'
          });
      }


      const createdId = await ridesRepository.createRide(ride);
      if (!createdId) {
        return res.status(500).send({
          error_code: ApiErrorEnum.SERVER_ERROR,
          message: 'Unknown error'
        });
      }
      const createdRide = await ridesRepository.getRideById(createdId);
      return res.status(201).send(createdRide);

    } catch(err) {
      Logger.error(`${err}`)
      return res.status(500).send({
        error_code: ApiErrorEnum.SERVER_ERROR,
        message: 'Unknown error'
      });
    }
  }
}