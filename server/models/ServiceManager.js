import mongoose from 'mongoose';

const serviceManagerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'ServiceCategory',
    },
  ],
  services: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'HealthcareService',
    },
  ],
});

const ServiceManager = mongoose.model('ServiceManager', serviceManagerSchema);

export default ServiceManager;
