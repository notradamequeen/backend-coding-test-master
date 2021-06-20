"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = __importStar(require("sqlite3"));
const logger_1 = __importDefault(require("../lib/logger"));
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');
class default_1 {
    static setupDb() {
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
    static generateDummyRides(count) {
        const startLat = -90;
        const startLon = -180;
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
            };
            // insert generated dummy ride to Rides table
            logger_1.default.info(`Generate dummy ride - ${i + 1}`);
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
    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }
    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, function (error) {
                const that = this;
                if (error) {
                    return rej(error.message);
                }
                return res(that);
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlcG9zaXRvcnkvYmFzZS5yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFrQztBQUNsQywyREFBbUM7QUFFbkMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pDLE1BQU0sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUc1QztJQUVFLE1BQU0sQ0FBQyxPQUFPO1FBQ1osRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLGlCQUFpQjtZQUNqQixNQUFNLGNBQWMsR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRXZCLGlCQUFpQjtZQUNqQixNQUFNLGdCQUFnQixHQUFHOzs7Ozs7Ozs7OztVQVdyQixDQUFDO1lBQ0wsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBRSxLQUFhO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFBO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFBO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsdUJBQXVCO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDN0MsU0FBUyxFQUFFLFFBQVEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5QyxNQUFNLEVBQUUsUUFBUSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLE9BQU8sRUFBRSxRQUFRLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDNUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsVUFBVSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsYUFBYSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTthQUNsQyxDQUFBO1lBRUQsNkNBQTZDO1lBQzdDLGdCQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxNQUFNLGVBQWUsR0FBRzs7cUNBRU8sQ0FBQztZQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsUUFBUSxDQUFDLFFBQVE7Z0JBQ2pCLFFBQVEsQ0FBQyxTQUFTO2dCQUNsQixRQUFRLENBQUMsTUFBTTtnQkFDZixRQUFRLENBQUMsT0FBTztnQkFDaEIsUUFBUSxDQUFDLFNBQVM7Z0JBQ2xCLFFBQVEsQ0FBQyxVQUFVO2dCQUNuQixRQUFRLENBQUMsYUFBYTthQUN2QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFFLElBQVMsRUFBRSxNQUFXO1FBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyQyxJQUFJLEtBQUssRUFBRTtvQkFDUCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdCO2dCQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBRSxJQUFTLEVBQUUsTUFBVztRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QjtnQkFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUUsSUFBUyxFQUFFLE1BQVc7UUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxLQUFVO2dCQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDN0I7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FHRjtBQTNGRCw0QkEyRkMifQ==