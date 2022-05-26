"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rides_controller_1 = __importDefault(require("./rides.controller"));
const middleware_1 = require("./middleware");
const router = express_1.Router();
router.get('', middleware_1.authenticationHandler, rides_controller_1.default.getAllRides);
router.get('/:rideID', middleware_1.authenticationHandler, rides_controller_1.default.getRideById);
router.post('', middleware_1.authenticationHandler, rides_controller_1.default.createRide);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMucm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JpZGVzLnJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFpQztBQUVqQywwRUFBaUQ7QUFDakQsNkNBQXFEO0FBRXJELE1BQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUd4QixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxrQ0FBcUIsRUFBRSwwQkFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGtDQUFxQixFQUFFLDBCQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsa0NBQXFCLEVBQUUsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUduRSxrQkFBZSxNQUFNLENBQUMifQ==