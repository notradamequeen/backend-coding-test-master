import * as sqlite from 'sqlite3';
import Logger from '../lib/logger';
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');
const saltRounds = 10;

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

        //   const insertItems = `INSERT INTO items (name, price) VALUES ('book', 12.99), ('t-shirt', 15.99), ('milk', 3.99);`
        //   db.run(insertItems);
      });
  }

  static all (stmt: any, params: any) {
      return new Promise((res, rej) => {
          db.all(stmt, params, (error, result) => {
              if (error) {
                  return rej(error.message);
              }
              return res(result);
          });
      })
  }
  static get (stmt: any, params: any) {
      return new Promise((res, rej) => {
          db.get(stmt, params, (error, result) => {
              if (error) {
                  return rej(error.message);
              }
              return res(result);
          });
      })
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
      })
  }


}