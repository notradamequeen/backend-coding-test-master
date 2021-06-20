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
    static getAllRides(startIndex, endIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const rides = yield base_repository_1.default.all('SELECT * FROM Rides ORDER BY created LIMIT ?, ?', [startIndex, endIndex]);
            return rides;
        });
    }
    static getTotalRidesCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalRides = yield base_repository_1.default.get('SELECT COUNT(*) FROM Rides', []);
            return totalRides['COUNT(*)'];
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
                logger_1.default.error(err);
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
                logger_1.default.error(err);
                return false;
            }
        });
    }
    static truncateRides() {
        return __awaiter(this, void 0, void 0, function* () {
            const stmt = `DELETE FROM Rides;`;
            try {
                yield base_repository_1.default.run(stmt, []);
                return true;
            }
            catch (err) {
                logger_1.default.error(err);
                return false;
            }
        });
    }
}
exports.default = default_1;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMucmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3J5L3JpZGVzLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBbUM7QUFDbkMsMkRBQW1DO0FBSW5DO0lBRUksTUFBTSxDQUFPLFdBQVcsQ0FBRSxVQUFrQixFQUFFLFFBQWdCOztZQUMxRCxNQUFNLEtBQUssR0FBRyxNQUFNLHlCQUFFLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEcsT0FBTyxLQUFlLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLGtCQUFrQjs7WUFDN0IsTUFBTSxVQUFVLEdBQVEsTUFBTSx5QkFBRSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQVcsQ0FBQTtRQUN6QyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sV0FBVyxDQUFFLE1BQWM7O1lBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0seUJBQUUsQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVFLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsTUFBTSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdkMsT0FBTyxJQUFZLENBQUM7UUFDeEIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFVBQVUsQ0FBRSxJQUFVOztZQUMvQixNQUFNLElBQUksR0FBRzs7eUNBRW9CLENBQUM7WUFDbEMsSUFBSTtnQkFDQSxNQUFNLFdBQVcsR0FBUSxNQUFNLHlCQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDeEMsSUFBSSxDQUFDLFFBQVE7b0JBQ2IsSUFBSSxDQUFDLFNBQVM7b0JBQ2QsSUFBSSxDQUFDLE1BQU07b0JBQ1gsSUFBSSxDQUFDLE9BQU87b0JBQ1osSUFBSSxDQUFDLFNBQVM7b0JBQ2QsSUFBSSxDQUFDLFVBQVU7b0JBQ2YsSUFBSSxDQUFDLGFBQWE7aUJBQ3JCLENBQUMsQ0FBQztnQkFDSCxnQkFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQzthQUM3QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNmO1FBRUwsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFVBQVUsQ0FBRSxNQUFjOztZQUNuQyxNQUFNLElBQUksR0FBRyxxQ0FBcUMsQ0FBQTtZQUNsRCxJQUFJO2dCQUNBLE1BQU0seUJBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLGdCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLEtBQUssQ0FBQzthQUNoQjtRQUNMLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxhQUFhOztZQUN0QixNQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQTtZQUNqQyxJQUFJO2dCQUNBLE1BQU0seUJBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQzthQUNmO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUE5REQsNEJBOERDO0FBQUEsQ0FBQyJ9