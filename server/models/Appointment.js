import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true,
  },
  healthProfessional: {
    type: mongoose.Schema.ObjectId,
    ref: 'HealthProfessional',
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  facility: {
    type: mongoose.Schema.ObjectId,
    ref: 'HealthcareFacility',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'scheduled',
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

appointmentSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  // retrieve patient and health professional associations
  const patient = await mongoose.model('Patient').findById(this.patient);
  const doctor = await mongoose
    .model('HealthProfessional')
    .findById(this.healthProfessional);

  // add appointment to patient and healthProfessional
  patient.appointments.push(this.id);
  doctor.appointments.push(this.id);

  await patient.save();
  await doctor.save();

  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
