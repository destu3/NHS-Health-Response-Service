import HandlerFactory from '../classes/HandlerFactory.js';
import _Appointment from '../models/Appointment.js';

// remove later after all controllers have been fully configured and are being used by routers
// doing this for now because using .populate() reference models requires the reference models to be loaded
import _Patient from '../models/Patient.js';
import _HealthProfessional from '../models/HealthProfessional.js';
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
