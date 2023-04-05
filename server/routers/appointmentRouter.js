import express from 'express';
import AppointmentController from '../controllers/AppointmentController.js';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

const appointmentController = new AppointmentController();
const authController = new AuthController();

// route handlers
router
  .route('/')
  .get(authController.protect(), appointmentController.getAppointments())
  .post(appointmentController.bookAppointment());
router
  .route('/:id')
  .delete(appointmentController.cancelAppointment())
  .patch(appointmentController.updateAppointment());

export default router;
