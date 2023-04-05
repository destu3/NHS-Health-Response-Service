import _Patient from '../models/Patient';
import _HealthProfessional from '../models/HealthProfessional';
import _ServiceManager from '../models/ServiceManager';

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

  getInfo(req, res, next) {}

  updateInfo(req, res, next) {}

  deleteInfo(req, res, next) {}
}

export default UserController;
