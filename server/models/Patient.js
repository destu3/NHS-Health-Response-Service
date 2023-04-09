import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const patientSchema = new mongoose.Schema({
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
  dob: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodType: {
    type: String,
  },
  doctors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'HealthProfessional',
    },
  ],
  healthProfile: {
    type: mongoose.Schema.ObjectId,
    ref: 'HealthProfile',
  },
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

patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // password has been changed or newly created
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 12);
  next();
  console.log(this.password);
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
