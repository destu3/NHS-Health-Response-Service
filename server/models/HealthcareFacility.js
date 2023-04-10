import mongoose from 'mongoose';

const healthcareFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  services: [
    {
      type: String,
      required: true,
    },
  ],
  operatingHours: {
    type: Object,
    required: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    city: String,
    address: String,
  },
});

healthcareFacilitySchema.index({ location: '2dsphere' });

const HealthcareFacility = mongoose.model(
  'HealthcareFacility',
  healthcareFacilitySchema
);

export default HealthcareFacility;
