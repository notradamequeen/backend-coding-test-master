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
const base_repository_1 = __importDefault(require("../src/repository/base.repository"));
const chai_1 = require("chai");
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = require("supertest");
const enum_1 = require("../src/enum");
describe('GET /health', () => {
    it('should return health', (done) => {
        supertest_1.agent(app_1.default)
            .get('/health')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });
});
describe('Test positive cases - rides Api', () => {
    it('should success POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    it('should success GET /rides', () => __awaiter(void 0, void 0, void 0, function* () {
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
        chai_1.expect(res.body.count).to.greaterThan(0);
    }));
    it('should success GET /rides with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
        base_repository_1.default.generateDummyRides(20);
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
        const res = yield supertest_1.agent(app_1.default).get(`/rides?page=1&limit=20`);
        chai_1.expect(res.status).to.equal(200);
        chai_1.expect(res.body.page).to.equal(1);
        chai_1.expect(res.body.result.length).to.greaterThan(10);
        chai_1.expect(res.body.count).to.greaterThan(0);
    }));
    it('should success GET /rides/:rideId', () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
});
describe('Test negative cases - rides Api', () => {
    it('should failed validation start lat long - POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
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
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.VALIDATION_ERROR);
    }));
    it('should failed validation end lat long - POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
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
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.VALIDATION_ERROR);
    }));
    it('should failed validation empty rider name - POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            start_lat: '-45.5',
            start_long: '67.5',
            end_lat: '-70.56',
            end_long: '76.5',
            rider_name: '',
            driver_name: 'test driver',
            driver_vehicle: 'test vehicle'
        };
        const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
        chai_1.expect(res.status).to.equal(400);
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.VALIDATION_ERROR);
    }));
    it('should failed validation empty driver name - POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            start_lat: '-45.5',
            start_long: '67.5',
            end_lat: '-70.56',
            end_long: '76.5',
            rider_name: 'test rider',
            driver_name: '',
            driver_vehicle: 'test vehicle'
        };
        const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
        chai_1.expect(res.status).to.equal(400);
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.VALIDATION_ERROR);
    }));
    it('should failed validation empty driver vehicle - POST /rides', () => __awaiter(void 0, void 0, void 0, function* () {
        const rideData = {
            start_lat: '-45.5',
            start_long: '67.5',
            end_lat: '-70.56',
            end_long: '76.5',
            rider_name: 'test rider',
            driver_name: 'test driver',
            driver_vehicle: ''
        };
        const res = yield supertest_1.agent(app_1.default).post('/rides').send(rideData);
        chai_1.expect(res.status).to.equal(400);
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.VALIDATION_ERROR);
    }));
    it('should failed not found rider - GET /rides', () => __awaiter(void 0, void 0, void 0, function* () {
        yield rides_repository_1.default.truncateRides();
        const res = yield supertest_1.agent(app_1.default).get('/rides');
        chai_1.expect(res.status).to.equal(404);
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.RIDES_NOT_FOUND_ERROR);
    }));
    it('should failed not found rider - GET /rides/:rideId', () => __awaiter(void 0, void 0, void 0, function* () {
        yield rides_repository_1.default.truncateRides();
        const res = yield supertest_1.agent(app_1.default).get('/rides/1');
        chai_1.expect(res.status).to.equal(404);
        chai_1.expect(res.body.error_code).to.equal(enum_1.ApiErrorEnum.RIDES_NOT_FOUND_ERROR);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0cy9hcGkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBGQUEwRDtBQUMxRCx3RkFBbUQ7QUFFbkQsK0JBQTRCO0FBQzVCLHFEQUE2QjtBQUM3Qix5Q0FBMkM7QUFFM0Msc0NBQTJDO0FBRTNDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBQzNCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xDLGlCQUFPLENBQUMsYUFBRyxDQUFDO2FBQ1QsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUNkLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDL0MsRUFBRSxDQUFDLDRCQUE0QixFQUFFLEdBQVMsRUFBRTtRQUMxQyxNQUFNLFFBQVEsR0FBRztZQUNiLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLGNBQWMsRUFBRSxjQUFjO1NBQ2pDLENBQUE7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLGlCQUFPLENBQUMsYUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxhQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsYUFBTSxDQUFD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