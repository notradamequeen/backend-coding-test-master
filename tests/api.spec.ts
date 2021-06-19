import rideRepo from '../src/repository/rides.repository';
import mocha from 'mocha';
import {expect} from 'chai';
import app from '../src/app';
import {agent as request} from 'supertest';
import { Ride } from '../src/models';
import { ApiErrorEnum } from '../src/enum';

describe('GET /health', () => {
  it('should return health', (done) => {
    request(app)
      .get('/health')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});

describe('Test positive cases - rides Api', () => {
  it('should success POST /rides', async () => {
    const rideData = {
        start_lat: '25.5',
        start_long: '30.5',
        end_lat: '-80.56',
        end_long: '76.5',
        rider_name: 'test rider',
        driver_name: 'test driver',
        driver_vehicle: 'test vehicle'
    }
    const res = await request(app).post('/rides').send(rideData);
    expect(res.status).to.equal(201);
    expect(res.body).to.haveOwnProperty('rideID');
  });

  it('should success GET /rides', async () => {
    const mockRide: Ride = {
        startLat: Number('30.5'),
        startLong: Number('40.5'),
        endLat: Number('-80.56'),
        endLong: Number('76.5'),
        riderName: 'test rider',
        driverName: 'test driver',
        driverVehicle: 'test vehicle'
    }
    await rideRepo.createRide(mockRide);

    const res = await request(app).get('/rides');
    expect(res.status).to.equal(200);
    expect(res.body.length).to.greaterThan(0);
  });

  it('should success GET /rides/:rideId', async () => {
    const mockRide: Ride = {
        startLat: Number('20.5'),
        startLong: Number('50.5'),
        endLat: Number('-70.56'),
        endLong: Number('86.5'),
        riderName: 'test rider 3',
        driverName: 'test driver 3',
        driverVehicle: 'test vehicle 3'
    }
    const rideId = await rideRepo.createRide(mockRide);

    const res = await request(app).get(`/rides/${rideId}`);
    expect(res.status).to.equal(200);
    expect(res.body.rideID).to.equal(rideId);
    expect(res.body.startLat).to.equal(mockRide.startLat);
    expect(res.body.riderName).to.equal(mockRide.riderName);
    expect(res.body.driverName).to.equal(mockRide.driverName);
  });

});

describe('Test negative cases - rides Api', () => {
  it('should failed validation start lat long - POST /rides', async () => {
    const rideData = {
        start_lat: '-125.5',
        start_long: '130.5',
        end_lat: '-80.56',
        end_long: '76.5',
        rider_name: 'test rider',
        driver_name: 'test driver',
        driver_vehicle: 'test vehicle'
    }
    const res = await request(app).post('/rides').send(rideData);
    expect(res.status).to.equal(400);
    expect(res.body.error_code).to.equal(ApiErrorEnum.VALIDATION_ERROR);
  });

  it('should failed validation end lat long - POST /rides', async () => {
    const rideData = {
        start_lat: '-45.5',
        start_long: '67.5',
        end_lat: '-90.56',
        end_long: '176.5',
        rider_name: 'test rider',
        driver_name: 'test driver',
        driver_vehicle: 'test vehicle'
    }
    const res = await request(app).post('/rides').send(rideData);
    expect(res.status).to.equal(400);
    expect(res.body.error_code).to.equal(ApiErrorEnum.VALIDATION_ERROR);
  });

  it('should failed validation empty rider name - POST /rides', async () => {
    const rideData = {
        start_lat: '-45.5',
        start_long: '67.5',
        end_lat: '-70.56',
        end_long: '76.5',
        rider_name: '',
        driver_name: 'test driver',
        driver_vehicle: 'test vehicle'
    }
    const res = await request(app).post('/rides').send(rideData);
    expect(res.status).to.equal(400);
    expect(res.body.error_code).to.equal(ApiErrorEnum.VALIDATION_ERROR);
  });

  it('should failed validation empty driver name - POST /rides', async () => {
    const rideData = {
        start_lat: '-45.5',
        start_long: '67.5',
        end_lat: '-70.56',
        end_long: '76.5',
        rider_name: 'test rider',
        driver_name: '',
        driver_vehicle: 'test vehicle'
    }
    const res = await request(app).post('/rides').send(rideData);
    expect(res.status).to.equal(400);
    expect(res.body.error_code).to.equal(ApiErrorEnum.VALIDATION_ERROR);
  });

  it('should failed validation empty driver vehicle - POST /rides', async () => {
      const rideData = {
          start_lat: '-45.5',
          start_long: '67.5',
          end_lat: '-70.56',
          end_long: '76.5',
          rider_name: 'test rider',
          driver_name: 'test driver',
          driver_vehicle: ''
      }
      const res = await request(app).post('/rides').send(rideData);
      expect(res.status).to.equal(400);
      expect(res.body.error_code).to.equal(ApiErrorEnum.VALIDATION_ERROR);
  });

  it('should failed not found rider - GET /rides', async () => {
      await rideRepo.truncateRides();
      const res = await request(app).get('/rides');
      expect(res.status).to.equal(404);
      expect(res.body.error_code).to.equal(ApiErrorEnum.RIDES_NOT_FOUND_ERROR);
  });

  it('should failed not found rider - GET /rides/:rideId', async () => {
      await rideRepo.truncateRides();
      const res = await request(app).get('/rides/1');
      expect(res.status).to.equal(404);
      expect(res.body.error_code).to.equal(ApiErrorEnum.RIDES_NOT_FOUND_ERROR);
  });
});


