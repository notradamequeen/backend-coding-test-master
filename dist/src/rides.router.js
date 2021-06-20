"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rides_controller_1 = __importDefault(require("./rides.controller"));
const router = express_1.Router();
router.get('', rides_controller_1.default.getAllRides);
router.get('/:rideID', rides_controller_1.default.getRideById);
router.post('', rides_controller_1.default.createRide);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlkZXMucm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JpZGVzLnJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFpQztBQUVqQywwRUFBaUQ7QUFFakQsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBR3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLDBCQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsMEJBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSwwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRzVDLGtCQUFlLE1BQU0sQ0FBQyJ9