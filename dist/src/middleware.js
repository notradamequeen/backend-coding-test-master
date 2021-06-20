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
exports.authenticationHandler = exports.requestLogger = void 0;
const logger_1 = __importDefault(require("./lib/logger"));
const requestLogger = (req, res, next) => {
    logger_1.default.info(`HTTP ${req.method} ${req.path} - from ip: ${req.ip}`);
    next();
};
exports.requestLogger = requestLogger;
const authenticationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['x-api-key']) {
        res.status(401).json('Unauthorized!');
    }
    else if (req.headers['x-api-key'] !== process.env.API_KEY) {
        res.status(401).json('Invalid token!');
    }
    else {
        next();
    }
});
exports.authenticationHandler = authenticationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUkzQixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzdFLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBSFksUUFBQSxhQUFhLGlCQUd6QjtBQUdNLE1BQU0scUJBQXFCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMzRixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN6QztTQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUN6RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQzFDO1NBQU07UUFDSCxJQUFJLEVBQUUsQ0FBQTtLQUNUO0FBRUwsQ0FBQyxDQUFBLENBQUE7QUFUWSxRQUFBLHFCQUFxQix5QkFTakMifQ==