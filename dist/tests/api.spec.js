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
const rides_repository_1 = __importDefault(require("../src/repository/rides.repository"));
const chai_1 = require("chai");
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = require("supertest");
describe('Test positive cases - rides Api', () => {
    it('should success POST /rides', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const rideData = {
                start_lat: '25.5',
                start_long: '30.5',
                end_lat: '-80.56',
                end_long: '76.5',
                rider_name: 'test rider',
                driver_name: 'test driver',
                driver_vehicle: 'test vehicle'
            };
            const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
            chai_1.expect(res.status).to.equal(201);
            chai_1.expect(res.body).to.haveOwnProperty('rideID');
        });
    });
    it('should success GET /rides', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const mockRide = {
                startLat: Number('30.5'),
                startLong: Number('40.5'),
                endLat: Number('-80.56'),
                endLong: Number('76.5'),
                riderName: 'test rider',
                driverName: 'test driver',
                driverVehicle: 'test vehicle'
            };
            yield rides_repository_1.default.createRide(mockRide);
            const res = yield supertest_1.agent(app_1.default).get('/rides');
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body.length).to.greaterThan(0);
        });
    });
    it('should success GET /rides/:rideId', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const mockRide = {
                startLat: Number('20.5'),
                startLong: Number('50.5'),
                endLat: Number('-70.56'),
                endLong: Number('86.5'),
                riderName: 'test rider 3',
                driverName: 'test driver 3',
                driverVehicle: 'test vehicle 3'
            };
            const rideId = yield rides_repository_1.default.createRide(mockRide);
            const res = yield supertest_1.agent(app_1.default).get(`/rides/${rideId}`);
            chai_1.expect(res.status).to.equal(200);
            chai_1.expect(res.body.rideID).to.equal(rideId);
            chai_1.expect(res.body.startLat).to.equal(mockRide.startLat);
            chai_1.expect(res.body.riderName).to.equal(mockRide.riderName);
            chai_1.expect(res.body.driverName).to.equal(mockRide.driverName);
        });
    });
});
describe('Test negative cases - rides Api', () => {
    it('should failed validation start lat long - POST /rides', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const rideData = {
                start_lat: '-125.5',
                start_long: '130.5',
                end_lat: '-80.56',
                end_long: '76.5',
                rider_name: 'test rider',
                driver_name: 'test driver',
                driver_vehicle: 'test vehicle'
            };
            const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
            chai_1.expect(res.status).to.equal(400);
        });
    });
    it('should failed validation end lat long - POST /rides', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const rideData = {
                start_lat: '-45.5',
                start_long: '67.5',
                end_lat: '-90.56',
                end_long: '176.5',
                rider_name: 'test rider',
                driver_name: 'test driver',
                driver_vehicle: 'test vehicle'
            };
            const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
            chai_1.expect(res.status).to.equal(400);
        });
    });
    // it('should GET /rides', async function () {
    //     const mockRide: Ride = {
    //         startLat: Number('30.5'),
    //         startLong: Number('40.5'),
    //         endLat: Number('-80.56'),
    //         endLong: Number('76.5'),
    //         riderName: 'test rider',
    //         driverName: 'test driver',
    //         driverVehicle: 'test vehicle'
    //     }
    //     await rideRepo.createRide(mockRide);
    //     const res = await request(app).get('/rides');
    //     expect(res.status).to.equal(200);
    //     expect(res.body.length).to.greaterThan(0);
    // });
    // it('should GET /rides/:rideId', async function () {
    //     const mockRide: Ride = {
    //         startLat: Number('20.5'),
    //         startLong: Number('50.5'),
    //         endLat: Number('-70.56'),
    //         endLong: Number('86.5'),
    //         riderName: 'test rider 3',
    //         driverName: 'test driver 3',
    //         driverVehicle: 'test vehicle 3'
    //     }
    //     const rideId = await rideRepo.createRide(mockRide);
    //     const res = await request(app).get(`/rides/${rideId}`);
    //     expect(res.status).to.equal(200);
    //     expect(res.body.rideID).to.equal(rideId);
    //     expect(res.body.startLat).to.equal(mockRide.startLat);
    //     expect(res.body.riderName).to.equal(mockRide.riderName);
    //     expect(res.body.driverName).to.equal(mockRide.driverName);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0cy9hcGkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBGQUEwRDtBQUUxRCwrQkFBNEI7QUFDNUIscURBQTZCO0FBQzdCLHlDQUEyQztBQUszQyxRQUFRLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO0lBQzdDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTs7WUFDN0IsTUFBTSxRQUFRLEdBQUc7Z0JBQ2IsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsY0FBYyxFQUFFLGNBQWM7YUFDakMsQ0FBQTtZQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0saUJBQU8sQ0FBQyxhQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdELGFBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTs7WUFDNUIsTUFBTSxRQUFRLEdBQVM7Z0JBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN4QixTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxD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