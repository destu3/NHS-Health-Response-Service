import mongoose from 'mongoose';

const healthProfessionalSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: 'doctor',
  },
  dob: {
    type: Date,
  },
  specialization: {
    type: String,
    required: true,
  },
  patients: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
  ],
  prescriptions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Prescription',
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Appointment',
    },
  ],
});

const HealthProfessional = mongoose.model(
  'HealthProfessional',
  healthProfessionalSchema
);

export default HealthProfessional;
