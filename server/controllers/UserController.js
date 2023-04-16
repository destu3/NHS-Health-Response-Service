import _Patient from '../models/Patient.js';
import _HealthProfessional from '../models/HealthProfessional.js';
import _ServiceManager from '../models/ServiceManager.js';
import HandlerFactory from '../classes/HandlerFactory.js';
import catchAsync from '../helpers/catchAsync.js';
import AuthController from './AuthController.js';

const authController = new AuthController();
const handlerFactory = new HandlerFactory(_Patient);

class UserController {
  constructor(
    Patient = _Patient,
    HealthProfessional = _HealthProfessional,
    ServiceManager = _ServiceManager
  ) {
    this.Patient = Patient;
    this.HealthProfessional = HealthProfessional;
    this.ServiceManager = ServiceManager;
  }

  getDoctors() {
    return catchAsync(async (req, res, next) => {
      const doctors = await this.HealthProfessional.find();

      // send response
      res.status(200).json({ status: 'success', data: { doctors } });
    });
  }

  getInfo() {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const role = req.body.role;
      let query;

      if (role === 'patient') {
        query = this.Patient.findById(id);
      } else if (role === 'doctor') {
        query = this.HealthProfessional.findById(id);
      } else if (role === 'manager') {
        query = this.ServiceManager.findById(id);
      }

      if (!role) throw new Error('A role must be specified');

      const doc = await query;

      if (!doc) throw new Error(`Couldn't find resource with id ${id}`);

      // send response
      res.status(200).json({ status: 'success', data: { doc } });
    });
  }

  updateInfo() {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const updatedData = req.body;
      const role = req.body.role;
      let query;

      if (role === 'patient') {
        query = this.Patient.findByIdAndUpdate(id, updatedData, {
          runValidators: true,
          new: true,
        });
      } else if (role === 'doctor') {
        query = this.HealthProfessional.findByIdAndUpdate(id, updatedData, {
          runValidators: true,
          new: true,
        });
      } else if (role === 'manager') {
        query = this.ServiceManager.findByIdAndUpdate(id, updatedData, {
          runValidators: true,
          new: true,
        });
      }

      if (!role) throw new Error('A role must be specified');

      const doc = await query;

      if (!doc) throw new Error(`Couldn't find resource with id ${id}`);

      if (doc.password) doc.password = undefined;

      const token = authController.sendToken({ doc });

      // send response
      res.status(200).json({ status: 'success', data: { doc }, token });
    });
  }
}

export default UserController;
