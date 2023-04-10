import express from 'express';
import FacilityController from '../controllers/FacilityController.js';

const facilityController = new FacilityController();

const router = express.Router();

router.post('/nearby', facilityController.discoverLocalFacilities());

export default router;
