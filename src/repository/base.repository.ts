import * as sqlite from 'sqlite3';
import Logger from '../lib/logger';
import { Ride } from '../models';
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');


export default class {

  static setupDb () {
    db.serialize(function () {
      //   Drop Tables:
      const dropRidesTable = 'DROP TABLE IF EXISTS rides';
      db.run(dropRidesTable);

      // Create Tables:
      const createRidesTable = `CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )`;
      db.run(createRidesTable);
    });
  }

  static generateDummyRides (count: number) {
    const startLat = -90
    const startLon = -180
    for (let i = 0; i < count; i++) {
      // Generates dummy ride
      const rideData = {
        startLat: startLat + i + Number(`0.${i + 2}`),
        startLong: startLon + i + Number(`0.${i + 2}`),
        endLat: startLat + i + Number(`0.${i * 2}`),
        endLong: startLon + i + Number(`0.${i * 2}`),
        riderName: `rider ${i + 1}`,
        driverName: `driver ${i + 1}`,
        driverVehicle: `vehicle ${i + 1}`
      }

      // insert generated dummy ride to Rides table
      Logger.info(`Generate dummy ride - ${i + 1}`);
      const insertDummyRide = `INSERT INTO Rides
        (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.run(insertDummyRide, [
        rideData.startLat,
        rideData.startLong,
        rideData.endLat,
        rideData.endLong,
        rideData.riderName,
        rideData.driverName,
        rideData.driverVehicle
      ]);
    }
  }

  static all (stmt: any, params: any) {
    return new Promise((res, rej) => {
      db.all(stmt, params, (error, result) => {
        if (error) {
            return rej(error.message);
        }
        return res(result);
      });
    });
  }
  static get (stmt: any, params: any) {
    return new Promise((res, rej) => {
      db.get(stmt, params, (error, result) => {
        if (error) {
            return rej(error.message);
        }
        return res(result);
      });
    });
  }

  static run (stmt: any, params: any) {
    return new Promise((res, rej) => {
      db.run(stmt, params, function (error: any) {
        const that = this;
        if (error) {
            return rej(error.message);
        }
        return res(that);
      });
    });
  }


}