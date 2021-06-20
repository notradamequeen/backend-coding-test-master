"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./src/lib/logger"));
const app_1 = __importDefault(require("./src/app"));
const port = 8000;
app_1.default.listen(port, () => {
    logger_1.default.info(`App started and listening on port ${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFzQztBQUN0QyxvREFBNEI7QUFHNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLGFBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixnQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUM1RCxDQUFDLENBQUMsQ0FBQyJ9