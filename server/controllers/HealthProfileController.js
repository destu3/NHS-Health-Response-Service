import _HealthProfile from '../models/HealthProfile.js';
import HandlerFactory from '../classes/HandlerFactory.js';

const handlerFactory = new HandlerFactory(_HealthProfile);

class HealthProfileController {
  constructor(HealthProfile = _HealthProfile) {
    this.HealthProfile = HealthProfile;
  }

  getProfile() {
    return handlerFactory.get();
  }

  updateProfile() {
    return handlerFactory.update();
  }

  deleteProfile() {
    return handlerFactory.delete();
  }
}

export default HealthProfileController;
