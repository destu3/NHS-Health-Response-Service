import express from 'express';
import AppointmentController from '../controllers/AppointmentController.js';

const router = express.Router();

const appointmentController = new AppointmentController();

// route handlers
router
  .route('/')
  .get(appointmentController.getAppointments())
  .post(appointmentController.bookAppointment());
router
  .route('/:id')
  .delete(appointmentController.cancelAppointment())
  .patch(appointmentController.updateAppointment());

export default router;
