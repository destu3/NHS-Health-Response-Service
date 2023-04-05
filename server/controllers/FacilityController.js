import _HealthcareFacility from '../models/HealthcareFacility';

class FacilityController {
  constructor(HealthcareFacility = _HealthcareFacility) {
    this.HealthcareFacility = HealthcareFacility;
  }

  discoverLocalFacilities(req, res, next) {}
}

export default FacilityController;
