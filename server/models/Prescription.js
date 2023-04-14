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
  },
  routeOfAdministration: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  dosage: {
    type: String,
  },
  duration: {
    type: String,
  },
  frequency: {
    type: String,
  },
  refills: {
    type: Number,
  },
  notes: {
    type: String,
  },
});

prescriptionSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  // retrieve patient and health professional associations
  const patient = await mongoose.model('Patient').findById(this.patient);
  const doctor = await mongoose
    .model('HealthProfessional')
    .findById(this.doctor);

  // add appointment to patient and healthProfessional
  patient.prescriptions.push(this.id);
  doctor.prescriptions.push(this.id);

  await patient.save();
  await doctor.save();

  next();
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
