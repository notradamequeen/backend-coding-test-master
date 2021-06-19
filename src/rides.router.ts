import { Router } from 'express';
import ridesController from './rides.controller';

const router = Router();


router.get('', ridesController.getAllRides);
router.get('/:rideID', ridesController.getRideById);
router.post('', ridesController.createRide);

export default router;


