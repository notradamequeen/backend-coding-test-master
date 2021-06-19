"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const base_repository_1 = __importDefault(require("./repository/base.repository"));
const rides_router_1 = __importDefault(require("./rides.router"));
const middleware_1 = __importDefault(require("./middleware"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(middleware_1.default);
app.get('/health', (req, res) => res.send('Healthy'));
app.use('/rides', rides_router_1.default);
//  Script to setup sqlite DB in memory //
base_repository_1.default.setupDb();
exports.default = app;
// import express from 'express';
// import bodyParser from 'body-parser';
// import { Database } from 'sqlite3';
// import { Ride } from './models';
// const app: express.Application = express();
// const jsonParser = bodyParser.json();
// module.exports = (db: Database): express.Application => {
//     app.get('/health', (req: any, res): any => res.send('Healthy'));
//     app.post('/rides', jsonParser, (req, res): any => {
//         const startLatitude = Number(req.body.start_lat);
//         const startLongitude = Number(req.body.start_long);
//         const endLatitude = Number(req.body.end_lat);
//         const endLongitude = Number(req.body.end_long);
//         const riderName = req.body.rider_name;
//         const driverName = req.body.driver_name;
//         const driverVehicle = req.body.driver_vehicle;
//         if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
//             return res.send({
//                 error_code: 'VALIDATION_ERROR',
//                 message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
//             });
//         }
//         if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
//             return res.send({
//                 error_code: 'VALIDATION_ERROR',
//                 message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
//             });
//         }
//         if (typeof riderName !== 'string' || riderName.length < 1) {
//             return res.send({
//                 error_code: 'VALIDATION_ERROR',
//                 message: 'Rider name must be a non empty string'
//             });
//         }
//         if (typeof driverName !== 'string' || driverName.length < 1) {
//             return res.send({
//                 error_code: 'VALIDATION_ERROR',
//                 message: 'Rider name must be a non empty string'
//             });
//         }
//         if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
//             return res.send({
//                 error_code: 'VALIDATION_ERROR',
//                 message: 'Rider name must be a non empty string'
//             });
//         }
//         const values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
//         const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, (err: any, res: any) => {
//             if (err) {
//                 return res.send({
//                     error_code: 'SERVER_ERROR',
//                     message: 'Unknown error'
//                 });
//             }
//             db.all('SELECT * FROM Rides WHERE rideID = :rideId', {rideId: res.lastID}, (err: any, rows: Ride[]) => {
//                 if (err) {
//                     return res.send({
//                         error_code: 'SERVER_ERROR',
//                         message: 'Unknown error'
//                     });
//                 }
//                 res.send(rows);
//             });
//         });
//     });
//     app.get('/rides', async (req, res) => {
//         // try {
//         //     const result: any = await db.get('SELECT * FROM Rides', []);
//         //     console.log(result)
//         //     if (result.rows.length === 0) {
//         //         return res.send({
//         //             error_code: 'RIDES_NOT_FOUND_ERROR',
//         //             message: 'Could not find any rides'
//         //         });
//         //     }
//         //     res.send(result.rows);
//         // } catch(err) {
//         //     console.log('err', err)
//         //     return res.send({
//         //         error_code: 'SERVER_ERROR',
//         //         message: 'Unknown error'
//         //     });
//         // }
//         // db.all('SELECT * FROM Rides', (err: any, rows: Ride[]) => {
//         //     if (err) {
//         //         return res.send({
//         //             error_code: 'SERVER_ERROR',
//         //             message: 'Unknown error'
//         //         });
//         //     }
//         //     if (rows.length === 0) {
//         //         return res.send({
//         //             error_code: 'RIDES_NOT_FOUND_ERROR',
//         //             message: 'Could not find any rides'
//         //         });
//         //     }
//         //     res.send(rows);
//         // });
//     });
//     app.get('/rides/:id', (req, res) => {
//         db.all(`SELECT * FROM Rides WHERE rideID=:rideId`, {rideId: req.params.id}, (err: any, rows: Ride[]) => {
//             if (err) {
//                 return res.send({
//                     error_code: 'SERVER_ERROR',
//                     message: 'Unknown error'
//                 });
//             }
//             if (rows.length === 0) {
//                 return res.send({
//                     error_code: 'RIDES_NOT_FOUND_ERROR',
//                     message: 'Could not find any rides'
//                 });
//             }
//             res.send(rows);
//         });
//     });
//     return app;
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw4REFBcUM7QUFDckMsbUZBQThDO0FBQzlDLGtFQUF5QztBQUN6Qyw4REFBd0M7QUFFeEMsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQVksQ0FBQyxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQUcsRUFBTyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLHNCQUFXLENBQUMsQ0FBQztBQUUvQiwwQ0FBMEM7QUFDMUMseUJBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUVaLGtCQUFlLEdBQUcsQ0FBQztBQUluQixpQ0FBaUM7QUFDakMsd0NBQXdDO0FBQ3hDLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFJbkMsOENBQThDO0FBRTlDLHdDQUF3QztBQUV4Qyw0REFBNEQ7QUFDNUQsdUVBQXVFO0FBRXZFLDBEQUEwRDtBQUMxRCw0REFBNEQ7QUFDNUQsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCwwREFBMEQ7QUFDMUQsaURBQWlEO0FBQ2pELG1EQUFtRDtBQUNuRCx5REFBeUQ7QUFFekQsNEdBQTRHO0FBQzVHLGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQsd0hBQXdIO0FBQ3hILGtCQUFrQjtBQUNsQixZQUFZO0FBRVosb0dBQW9HO0FBQ3BHLGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQsc0hBQXNIO0FBQ3RILGtCQUFrQjtBQUNsQixZQUFZO0FBRVosdUVBQXVFO0FBQ3ZFLGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQsbUVBQW1FO0FBQ25FLGtCQUFrQjtBQUNsQixZQUFZO0FBRVoseUVBQXlFO0FBQ3pFLGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQsbUVBQW1FO0FBQ25FLGtCQUFrQjtBQUNsQixZQUFZO0FBRVosK0VBQStFO0FBQy9FLGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQsbUVBQW1FO0FBQ25FLGtCQUFrQjtBQUNsQixZQUFZO0FBRVosNktBQTZLO0FBRTdLLGdNQUFnTTtBQUNoTSx5QkFBeUI7QUFDekIsb0NBQW9DO0FBQ3BDLGtEQUFrRDtBQUNsRCwrQ0FBK0M7QUFDL0Msc0JBQXNCO0FBQ3RCLGdCQUFnQjtBQUVoQix1SEFBdUg7QUFDdkgsNkJBQTZCO0FBQzdCLHdDQUF3QztBQUN4QyxzREFBc0Q7QUFDdEQsbURBQW1EO0FBQ25ELDBCQUEwQjtBQUMxQixvQkFBb0I7QUFFcEIsa0NBQWtDO0FBQ2xDLGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsVUFBVTtBQUVWLDhDQUE4QztBQUM5QyxtQkFBbUI7QUFDbkIsOEVBQThFO0FBQzlFLHFDQUFxQztBQUNyQyxpREFBaUQ7QUFDakQsdUNBQXVDO0FBQ3ZDLDhEQUE4RDtBQUM5RCw2REFBNkQ7QUFDN0QseUJBQXlCO0FBQ3pCLG1CQUFtQjtBQUNuQix3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBQzVCLHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsaURBQWlEO0FBQ2pELDhDQUE4QztBQUM5QyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmLHlFQUF5RTtBQUN6RSw0QkFBNEI7QUFDNUIsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCxrREFBa0Q7QUFDbEQseUJBQXlCO0FBQ3pCLG1CQUFtQjtBQUVuQiwwQ0FBMEM7QUFDMUMsdUNBQXVDO0FBQ3ZDLDhEQUE4RDtBQUM5RCw2REFBNkQ7QUFDN0QseUJBQXlCO0FBQ3pCLG1CQUFtQjtBQUVuQixpQ0FBaUM7QUFDakMsaUJBQWlCO0FBQ2pCLFVBQVU7QUFFViw0Q0FBNEM7QUFDNUMsb0hBQW9IO0FBQ3BILHlCQUF5QjtBQUN6QixvQ0FBb0M7QUFDcEMsa0RBQWtEO0FBQ2xELCtDQUErQztBQUMvQyxzQkFBc0I7QUFDdEIsZ0JBQWdCO0FBRWhCLHVDQUF1QztBQUN2QyxvQ0FBb0M7QUFDcEMsMkRBQTJEO0FBQzNELDBEQUEwRDtBQUMxRCxzQkFBc0I7QUFDdEIsZ0JBQWdCO0FBRWhCLDhCQUE4QjtBQUM5QixjQUFjO0FBQ2QsVUFBVTtBQUVWLGtCQUFrQjtBQUNsQixLQUFLIn0=