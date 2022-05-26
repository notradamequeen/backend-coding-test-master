import { Router } from 'express';
import Logger from './lib/logger';
import ridesController from './rides.controller';
import { authenticationHandler } from './middleware';

const router = Router();


router.get('', authenticationHandler, ridesController.getAllRides);
router.get('/:rideID', authenticationHandler, ridesController.getRideById);
router.post('', authenticationHandler, ridesController.createRide);


export default router;


