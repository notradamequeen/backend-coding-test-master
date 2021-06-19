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
const api_error_1 = require("./api.error");
const logger_1 = __importDefault(require("./lib/logger"));
const rides_repository_1 = __importDefault(require("./repository/rides.repository"));
const rides_repository_2 = __importDefault(require("./repository/rides.repository"));
class default_1 {
    static getAllRides(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rides = yield rides_repository_2.default.getAllRides();
                if (rides.length === 0) {
                    return res.status(404).send({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides'
                    });
                }
                res.status(200).send(rides);
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                return next(err);
                // return res.send({
                //     error_code: 'SERVER_ERROR',
                //     message: 'Unknown error'
                // });
            }
        });
    }
    static getRideById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rideID = req.params.rideID;
            try {
                const ride = yield rides_repository_1.default.getRideById(rideID);
                if (!ride) {
                    return res.send({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Ride not found!'
                    }).status(404);
                }
                return res.status(200).send(ride).status(200);
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                }).status(500);
            }
        });
    }
    static createRide(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ride = {
                startLat: Number(req.body.start_lat),
                startLong: Number(req.body.start_long),
                endLat: Number(req.body.end_lat),
                endLong: Number(req.body.end_long),
                riderName: req.body.rider_name,
                driverName: req.body.driver_name,
                driverVehicle: req.body.driver_vehicle
            };
            try {
                if (ride.startLat < -90 || ride.startLat > 90 || ride.startLong < -180 || ride.startLong > 180) {
                    // return res.send({
                    //     error_code: 'VALIDATION_ERROR',
                    //     message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    // })
                    throw new api_error_1.ValidationError('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
                }
                if (ride.endLat < -90 || ride.endLat > 90 || ride.endLong < -180 || ride.endLong > 180) {
                    // return res.send({
                    //     error_code: 'VALIDATION_ERROR',
                    //     message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    // });
                    throw new api_error_1.ValidationError('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
                }
                if (typeof ride.riderName !== 'string' || ride.riderName.length < 1) {
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }
                if (typeof ride.driverName !== 'string' || ride.driverName.length < 1) {
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }
                if (typeof ride.driverVehicle !== 'string' || ride.driverVehicle.length < 1) {
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }
                const createdId = yield rides_repository_1.default.createRide(ride);
                if (!createdId) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }
                const createdRide = yield rides_repository_1.default.getRideById(createdId);
                return res.status(201).send(createdRide);
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                next(err);
            }
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yaWRlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQTZEO0FBQzdELDBEQUFrQztBQUVsQyxxRkFBNEQ7QUFDNUQscUZBQWlEO0FBR2pEO0lBQ0UsTUFBTSxDQUFPLFdBQVcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCOztZQUN0RSxJQUFJO2dCQUNGLE1BQU0sS0FBSyxHQUFXLE1BQU0sMEJBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDeEIsVUFBVSxFQUFFLHVCQUF1Qjt3QkFDbkMsT0FBTyxFQUFFLDBCQUEwQjtxQkFDdEMsQ0FBQyxDQUFBO2lCQUNIO2dCQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQzVCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFBO2dCQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsb0JBQW9CO2dCQUNwQixrQ0FBa0M7Z0JBQ2xDLCtCQUErQjtnQkFDL0IsTUFBTTthQUNQO1FBQ0gsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLFdBQVcsQ0FBQyxHQUFZLEVBQUUsR0FBYTs7WUFDbEQsTUFBTSxNQUFNLEdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDeEMsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFD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