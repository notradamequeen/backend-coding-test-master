"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const base_repository_1 = __importDefault(require("./repository/base.repository"));
const rides_router_1 = __importDefault(require("./rides.router"));
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const middleware_1 = require("./middleware");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(middleware_1.requestLogger);
app.get('/health', (req, res) => res.send('Healthy'));
app.use('/rides', rides_router_1.default);
// docs
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
//  Script to setup sqlite DB in memory //
base_repository_1.default.setupDb();
base_repository_1.default.generateDummyRides(100);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw4REFBcUM7QUFDckMsNEVBQTJDO0FBQzNDLG1GQUE4QztBQUM5QyxrRUFBeUM7QUFDekMsd0VBQW1EO0FBQ25ELDZDQUE2QztBQUk3QyxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBYSxDQUFDLENBQUM7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDaEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsc0JBQVcsQ0FBQyxDQUFDO0FBRS9CLE9BQU87QUFDUCxHQUFHLENBQUMsR0FBRyxDQUNMLE9BQU8sRUFDUCw0QkFBUyxDQUFFLEtBQUssRUFDaEIsNEJBQVMsQ0FBQyxLQUFLLENBQUMsc0JBQWUsQ0FBQyxDQUNqQyxDQUFDO0FBRUYsMENBQTBDO0FBQzFDLHlCQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDWix5QkFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLGtCQUFlLEdBQUcsQ0FBQyJ9