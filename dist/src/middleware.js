"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = __importDefault(require("./lib/logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.info(`HTTP ${req.method} ${req.path} - from ip: ${req.ip}`);
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBEQUFrQztBQUkzQixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzdFLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBSFksUUFBQSxhQUFhLGlCQUd6QiJ9