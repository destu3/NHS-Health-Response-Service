import express from 'express';
import HealthProfileController from '../controllers/HealthProfileController.js';

const healthProfileController = new HealthProfileController();

const router = express.Router();

router
  .route('/:id')
  .get(healthProfileController.getProfile())
  .patch(healthProfileController.updateProfile())
  .delete(healthProfileController.deleteProfile());

export default router;
