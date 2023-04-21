import mongoose from 'mongoose';
import ServiceCategory from './ServiceCategory.js';

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
    enum: ['pending', 'approved', 'rejected', 'under development'],
    default: 'pending',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'ServiceCategory',
  },
});

healthcareServiceSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  // retrieve category
  const category = await mongoose
    .model('ServiceCategory')
    .findById(this.category);

  // add service to category
  category.services.push(this.id);

  await category.save();

  next();
});

healthcareServiceSchema.pre('findOneAndDelete', async function (next) {
  const doc = await mongoose
    .model('HealthcareService')
    .findOne(this._conditions);

  if (!doc) return next();

  const category = await ServiceCategory.findById(doc.category);
  const services = category.services;

  category.services = services.filter(
    service => service.toString() !== doc._id.toString()
  );

  await category.save();

  next();
});

const HealthcareService = mongoose.model(
  'HealthcareService',
  healthcareServiceSchema
);

export default HealthcareService;
