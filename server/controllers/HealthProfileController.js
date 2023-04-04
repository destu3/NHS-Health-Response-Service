import _HealthProfile from '../models/HealthProfile';

class HealthProfileController {
  constructor(HealthProfile = _HealthProfile) {
    this.HealthProfile = HealthProfile;
  }

  getProfile(req, res, next) {}

  updateProfile(req, res, next) {}

  deleteProfile(req, res, next) {}

  createProfile(req, res, next) {}
}

export default HealthProfileController;
