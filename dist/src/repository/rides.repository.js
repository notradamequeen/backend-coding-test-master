"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("./base.repository"));
const logger_1 = __importDefault(require("../lib/logger"));
class default_1 {
    static getAllRides() {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield base_repository_1.default.all('SELECT * FROM Rides', []);
            return rides;
        });
    }
    static getRideById(rideID) {
        return __awaiter(this, void 0, void 0, function* () {
            const ride = yield base_repository_1.default.get('SELECT * FROM Rides WHERE rideID = ?', [rideID]);
            logger_1.default.info(`ride ${rideID} - ${ride}`);
            return ride;
        });
    }
    static createRide(Ride) {
        return __awaiter(this, void 0, void 0, function* () {
            const stmt = `INSERT INTO Rides
            (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
            try {
                const createdRide = yield base_repository_1.default.run(stmt, [
                    Ride.startLat,
                    Ride.startLong,
                    Ride.endLat,
                    Ride.endLong,
                    Ride.riderName,
                    Ride.driverName,
                    Ride.driverVehicle
                ]);
                logger_1.default.info(`created ride ${createdRide.lastID}`);
                return createdRide.lastID;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    static deleteRide(rideID) {
        return __awaiter(this, void 0, void 0, function* () {
            const stmt = `DELETE FROM Rides WHERE rideID = ?;`;
            try {
                yield base_repository_1.default.run(stmt, [rideID]);
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMucmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3J5L3JpZGVzLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBbUM7QUFDbkMsMkRBQW1DO0FBSW5DO0lBRUksTUFBTSxDQUFPLFdBQVc7O1lBQ3BCLE1BQU0sS0FBSyxHQUFHLE1BQU0seUJBQUUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDckQsT0FBTyxLQUFlLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFdBQVcsQ0FBRSxNQUFjOztZQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLHlCQUFFLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RSxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLE1BQU0sTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZDLE9BQU8sSUFBWSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxVQUFVLENBQUUsSUFBVTs7WUFDL0IsTUFBTSxJQUFJLEdBQUc7O3lDQUVvQixDQUFDO1lBQ2xDLElBQUk7Z0JBQ0EsTUFBTSxXQUFXLEdBQVEsTUFBTSx5QkFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxRQUFRO29CQUNiLElBQUksQ0FBQyxTQUFTO29CQUNkLElBQUksQ0FBQyxNQUFNO29CQUNYLElBQUksQ0FBQyxPQUFPO29CQUNaLElBQUksQ0FBQyxTQUFTO29CQUNkLElBQUksQ0FBQyxVQUFVO29CQUNmLElBQUksQ0FBQyxhQUFhO2lCQUNyQixDQUFDLENBQUM7Z0JBQ0gsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUM7YUFDN0I7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLElBQUksQ0FBQzthQUNmO1FBRUwsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFVBQVUsQ0FBRSxNQUFjOztZQUNuQyxNQUFNLElBQUksR0FBRyxxQ0FBcUMsQ0FBQTtZQUNsRCxJQUFJO2dCQUNBLE1BQU0seUJBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUE5Q0QsNEJBOENDIn0=