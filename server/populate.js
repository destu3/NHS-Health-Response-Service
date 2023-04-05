import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// models
import Appointment from './models/Appointment.js';
import HealthcareFacility from './models/HealthcareFacility.js';
import HealthcareService from './models/HealthcareService.js';
import HealthProfessional from './models/HealthProfessional.js';
import HealthProfile from './models/HealthProfile.js';
import Patient from './models/Patient.js';
import Prescription from './models/Prescription.js';
import ServiceCategory from './models/ServiceCategory.js';
import ServiceManager from './models/ServiceManager.js';

// path to current file
const __filename = fileURLToPath(import.meta.url);

// path to current directory
const __dirname = path.dirname(__filename);

// environment variables set up
dotenv.config({ path: path.join(__dirname, '.env') });

// connect to remote database server
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.db_connection_string, {
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Connected to remote database server`));

const importData = async () => {
  try {
    // read data from files and create documents for each model
    const appointmentData = await fs.readFile(
      path.join(__dirname, 'data', 'appointments.json'),
      'utf8'
    );
    await Appointment.create(JSON.parse(appointmentData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const facilityData = await fs.readFile(
      path.join(__dirname, 'data', 'facilities.json'),
      'utf8'
    );
    await HealthcareFacility.create(JSON.parse(facilityData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const serviceData = await fs.readFile(
      path.join(__dirname, 'data', 'services.json'),
      'utf8'
    );
    await HealthcareService.create(JSON.parse(serviceData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const professionalData = await fs.readFile(
      path.join(__dirname, 'data', 'professionals.json'),
      'utf8'
    );
    await HealthProfessional.create(JSON.parse(professionalData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const profileData = await fs.readFile(
      path.join(__dirname, 'data', 'profiles.json'),
      'utf8'
    );
    await HealthProfile.create(JSON.parse(profileData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const patientData = await fs.readFile(
      path.join(__dirname, 'data', 'patients.json'),
      'utf8'
    );
    await Patient.create(JSON.parse(patientData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const prescriptionData = await fs.readFile(
      path.join(__dirname, 'data', 'prescriptions.json'),
      'utf8'
    );
    await Prescription.create(JSON.parse(prescriptionData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const categoryData = await fs.readFile(
      path.join(__dirname, 'data', 'categories.json'),
      'utf8'
    );
    await ServiceCategory.create(JSON.parse(categoryData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    const managerData = await fs.readFile(
      path.join(__dirname, 'data', 'managers.json'),
      'utf8'
    );
    await ServiceManager.create(JSON.parse(managerData), {
      validateBeforeSave: false,
    });
    console.log('Data imported successfully');

    mongoose.disconnect();
    console.log('ALL Data imported successfully');
  } catch (err) {
    console.log('Error occurred', err);
  }
};

importData();
