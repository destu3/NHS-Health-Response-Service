import _HealthcareFacility from '../models/HealthcareFacility.js';
import catchAsync from '../helpers/catchAsync.js';

class FacilityController {
  constructor(HealthcareFacility = _HealthcareFacility) {
    this.HealthcareFacility = HealthcareFacility;
  }

  discoverLocalFacilities() {
    return catchAsync(async (req, res, next) => {
      const lng = req.body.lng;
      const lat = req.body.lat;
      const distance = req.body.distance;

      if (!lat || !lng || !distance)
        throw new Error(
          'Please provide latitude, longitude, and distance in miles'
        );

      const radius = distance / 3963.2;

      // find facilities within radius using geoSpatial query operator
      const facilities = await this.HealthcareFacility.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      });

      res.status(200).json({
        status: 'success',
        results: facilities.length,
        facilities,
      });
    });
  }
}

export default FacilityController;
