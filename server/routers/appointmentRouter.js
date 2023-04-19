import express from 'express';
import AppointmentController from '../controllers/AppointmentController.js';

const router = express.Router();

const appointmentController = new AppointmentController();

// route handlers
router.route('/').post(appointmentController.getAppointments());

router.post('/book-appointment', appointmentController.bookAppointment());

router
  .route('/:id')
  .delete(appointmentController.cancelAppointment())
  .patch(appointmentController.updateAppointment());

export default router;
