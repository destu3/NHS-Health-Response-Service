import _HealthcareService from '../models/HealthcareService';

class ServiceController {
  constructor(HealthcareService = _HealthcareService) {
    this.HealthcareService = HealthcareService;
  }

  addService(req, res, next) {}

  updateService(req, res, next) {}

  deleteService(req, res, next) {}

  getServices(req, res, next) {}
}

export default ServiceController;
