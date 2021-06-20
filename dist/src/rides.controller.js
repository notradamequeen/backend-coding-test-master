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
const logger_1 = __importDefault(require("./lib/logger"));
const rides_repository_1 = __importDefault(require("./repository/rides.repository"));
const rides_repository_2 = __importDefault(require("./repository/rides.repository"));
const enum_1 = require("./enum");
const validation_1 = require("./utils/validation");
class RidesController {
    static getAllRides(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;
            try {
                const totalRidesCount = yield rides_repository_2.default.getTotalRidesCount();
                const rides = yield rides_repository_2.default.getAllRides(startIndex, endIndex);
                if (rides.length === 0) {
                    return res.status(404).send({
                        error_code: enum_1.ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
                        message: 'Could not find any rides'
                    });
                }
                res.status(200).send({
                    page: page,
                    limit: limit,
                    count: totalRidesCount,
                    result: rides
                });
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                return res.status(500).send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
        });
    }
    static getRideById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rideID = req.params.rideID;
            try {
                const ride = yield rides_repository_1.default.getRideById(rideID);
                if (!ride) {
                    res.status(404).send({
                        error_code: enum_1.ApiErrorEnum.RIDES_NOT_FOUND_ERROR,
                        message: 'Ride not found!'
                    });
                }
                res.status(200).send(ride).status(200);
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                return res.status(500).send({
                    error_code: enum_1.ApiErrorEnum.SERVER_ERROR,
                    message: 'Unknown error'
                });
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
                const { isValid, error } = validation_1.validateRide(ride);
                if (!isValid) {
                    res.status(400).send(error);
                }
                const createdId = yield rides_repository_1.default.createRide(ride);
                if (!createdId) {
                    return res.status(500).send({
                        error_code: enum_1.ApiErrorEnum.SERVER_ERROR,
                        message: 'Unknown error'
                    });
                }
                const createdRide = yield rides_repository_1.default.getRideById(createdId);
                return res.status(201).send(createdRide);
            }
            catch (err) {
                logger_1.default.error(`${err}`);
                return res.status(500).send({
                    error_code: enum_1.ApiErrorEnum.SERVER_ERROR,
                    message: 'Unknown error'
                });
            }
        });
    }
}
exports.default = RidesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yaWRlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQWtDO0FBRWxDLHFGQUE0RDtBQUM1RCxxRkFBaUQ7QUFDakQsaUNBQXNDO0FBQ3RDLG1EQUFrRDtBQUdsRCxNQUFxQixlQUFlO0lBQ2xDLE1BQU0sQ0FBTyxXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjs7WUFDdEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7WUFDNUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQ25DLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7WUFFM0IsSUFBSTtnQkFDRixNQUFNLGVBQWUsR0FBVyxNQUFNLDBCQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxLQUFLLEdBQVcsTUFBTSwwQkFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25FLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3RCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3hCLFVBQVUsRUFBRSxtQkFBWSxDQUFDLHFCQUFxQjt3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