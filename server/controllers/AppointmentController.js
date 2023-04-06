import HandlerFactory from '../classes/HandlerFactory.js';
import _Appointment from '../models/Appointment.js';

import catchAsync from '../helpers/catchAsync.js';

const handlerFactory = new HandlerFactory(_Appointment);

class AppointmentController {
  constructor(Appointment = _Appointment) {
    this.Appointment = Appointment;
  }

  getAppointments() {
    // Call the `getMany()` method of `handlerFactory`, passing in an array of two populate options
    return handlerFactory.getMany([
      { path: 'healthProfessional', select: '-__v -password' },
      { path: 'patient', select: '-__v -password' },
    ]);
  }

  cancelAppointment() {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;

      const appointment = await this.Appointment.findById(id);

      if (!appointment)
        throw new Error(`Couldn't find appointment with id ${id}`);

      appointment.status = 'cancelled';
      await appointment.save();

      res.status(204).json({ data: null });
    });
  }

  updateAppointment() {
    return handlerFactory.update();
  }

  bookAppointment() {
    return handlerFactory.createOne();
  }
}

export default AppointmentController;
