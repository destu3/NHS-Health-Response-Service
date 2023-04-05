import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'HealthProfessional',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  medicationName: {
    type: String,
    required: true,
  },
  routeOfAdministration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  refills: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
