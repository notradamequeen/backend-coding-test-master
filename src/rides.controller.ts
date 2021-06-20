import { Request, Response, NextFunction } from 'express';
import Logger from './lib/logger';
import { Ride } from './models';
import ridesRepository from './repository/rides.repository';
import repo from './repository/rides.repository';
import { ApiErrorEnum } from './enum';
import { validateRide } from './utils/validation';


export default class RidesController {
  static async getAllRides(req: Request, res: Response, next: NextFunction) {
    const page = req.query.page ? Number(req.query.page) : 1
    const limit = req.query.limit ? Number(req.query.limit) : 10
    let startIndex = (page - 1) * limit
    let endIndex = page * limit

    try {
      const totalRidesCount: number = await repo.getTotalRidesCount();
      const rides: Ride[] = await repo.getAllRides(startIndex, endIndex);
      if (rides.length === 0) {
        return res.status(404).send({
            error_code: ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
            message: 'Could not find any rides'
        })
      }
      res.status(200).send({
        page: page,
        limit: limit,
        count: totalRidesCount,
        result: rides
      });
    } catch (err) {
      Logger.error(`${err}`)
      return res.status(500).send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error'
      });
    }
  }

  static async getRideById(req: Request | any, res: Response | any) {
    const rideID: string = req.params.rideID
    try {
      const ride = await ridesRepository.getRideById(rideID);
      if (!ride) {
        res.status(404).send({
          error_code: ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
          message: 'Ride not found!'
        })
      }
      res.status(200).send(ride).status(200);
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

      const { isValid, error } = validateRide(ride);
      if (!isValid) {
        res.status(400).send(error)
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