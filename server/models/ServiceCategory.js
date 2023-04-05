import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proposedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'ServiceManager',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  services: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'HealthcareService',
    },
  ],
});

const ServiceCategory = mongoose.model(
  'ServiceCategory',
  serviceCategorySchema
);

export default ServiceCategory;
