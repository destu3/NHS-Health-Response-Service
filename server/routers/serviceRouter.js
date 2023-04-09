import express from 'express';
import ServiceController from '../controllers/ServiceController.js';

const serviceController = new ServiceController();

const router = express.Router();

router
  .route('/')
  .post(serviceController.addService())
  .get(serviceController.getServices());

router
  .route('/:id')
  .patch(serviceController.updateService())
  .delete(serviceController.deleteService());

export default router;
