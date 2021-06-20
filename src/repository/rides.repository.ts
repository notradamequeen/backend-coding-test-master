import db from './base.repository';
import Logger from '../lib/logger';
import { Ride } from '../models';


export default class {

    static async getAllRides (startIndex: Number, endIndex: Number): Promise<Ride[]> {
        const rides = await db.all('SELECT * FROM Rides ORDER BY created LIMIT ?, ?', [startIndex, endIndex]);
        return rides as Ride[]
    }

    static async getTotalRidesCount (): Promise<number>{
      const totalRides: any = await db.get('SELECT COUNT(*) FROM Rides', []);
      return totalRides['COUNT(*)'] as number
    }

    static async getRideById (rideID: string): Promise<Ride> {
        const ride = await db.get('SELECT * FROM Rides WHERE rideID = ?', [rideID]);
        Logger.info(`ride ${rideID} - ${ride}`)
        return ride as Ride;
    }

    static async createRide (Ride: Ride): Promise<string | null> {
        const stmt = `INSERT INTO Rides
            (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        try {
            const createdRide: any = await db.run(stmt, [
                Ride.startLat,
                Ride.startLong,
                Ride.endLat,
                Ride.endLong,
                Ride.riderName,
                Ride.driverName,
                Ride.driverVehicle
            ]);
            Logger.info(`created ride ${createdRide.lastID}`);
            return createdRide.lastID;
        } catch (err) {
            Logger.error(err);
            return null;
        }

    }

    static async deleteRide (rideID: number) {
        const stmt = `DELETE FROM Rides WHERE rideID = ?;`
        try {
            await db.run(stmt, [rideID]);
            return true;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }

    static async truncateRides () {
        const stmt = `DELETE FROM Rides;`
        try {
            await db.run(stmt, []);
            return true;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }
};

