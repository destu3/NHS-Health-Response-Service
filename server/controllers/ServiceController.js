import _HealthcareService from '../models/HealthcareService.js';
import HandlerFactory from '../classes/HandlerFactory.js';

const handlerFactory = new HandlerFactory(_HealthcareService);

class ServiceController {
  constructor(HealthcareService = _HealthcareService) {
    this.HealthcareService = HealthcareService;
  }

  addService() {
    return handlerFactory.createOne();
  }

  updateService() {
    return handlerFactory.update();
  }

  deleteService() {
    return handlerFactory.delete();
  }

  getServices() {
    return handlerFactory.getMany();
  }
}

export default ServiceController;
