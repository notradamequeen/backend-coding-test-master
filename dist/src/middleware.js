"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./lib/logger"));
function errorHandler(err, req, res, next) {
    logger_1.default.info(`err ${err}`);
    logger_1.default.info(`next ${next}`);
    // if (err) {
    //   if (err.status) {
    //     res.status(err.status).send({message: err.message});
    //   } else if (err.error_code) {
    //     switch(err.error_code) {
    //       case ApiErrorEnum.RIDES_NOT_FOUND_ERROR:
    //         res.status(404).send({message: err.message});
    //       case ApiErrorEnum.VALIDATION_ERROR:
    //         res.status(400).send({message: err.message});
    //       case ApiErrorEnum.SERVER_ERROR:
    //         res.status(500).send({message: err.message});
    //       default:
    //         res.status(500).send('Something went wrong!');
    //     }
    //   } else {
    //     res.status(500).send({message: err.message});
    //   } 
    // } else {
    //   res
    // }
}
exports.default = errorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsMERBQWtDO0FBR2xDLFNBQVMsWUFBWSxDQUFFLEdBQWlDLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUN2RyxnQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUIsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzNCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsMkRBQTJEO0lBQzNELGlDQUFpQztJQUNqQywrQkFBK0I7SUFDL0IsaURBQWlEO0lBQ2pELHdEQUF3RDtJQUN4RCw0Q0FBNEM7SUFDNUMsd0RBQXdEO0lBQ3hELHdDQUF3QztJQUN4Qyx3REFBd0Q7SUFDeEQsaUJBQWlCO0lBQ2pCLHlEQUF5RDtJQUN6RCxRQUFRO0lBQ1IsYUFBYTtJQUNiLG9EQUFvRDtJQUNwRCxPQUFPO0lBQ1AsV0FBVztJQUNYLFFBQVE7SUFDUixJQUFJO0FBQ04sQ0FBQztBQUVELGtCQUFlLFlBQVksQ0FBQyJ9