import mongoose from 'mongoose';

const healthProfileSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true,
  },
  medicalConditions: [
    {
      type: String,
    },
  ],
  allergies: [
    {
      type: String,
    },
  ],
  medication: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Prescription',
    },
  ],
  medicalVaccinations: [
    {
      type: String,
    },
  ],
  mentalConditions: [
    {
      type: String,
    },
  ],
});

const HealthProfile = mongoose.model('HealthProfile', healthProfileSchema);

export default HealthProfile;
