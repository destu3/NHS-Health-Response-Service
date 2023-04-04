import mongoose from 'mongoose';

const healthcareServiceSchema = new mongoose.Schema({
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
    enum: ['pending', 'approved', 'rejected', 'Under development'],
    default: 'pending',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'ServiceCategory',
  },
});

const HealthcareService = mongoose.model(
  'HealthcareService',
  healthcareServiceSchema
);

export default HealthcareService;
