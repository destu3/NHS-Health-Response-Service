import _Prescription from '../models/Prescription';

class PrescriptionController {
  constructor(Prescription = _Prescription) {
    this.Prescription = Prescription;
  }

  requestPrescription(req, res, next) {}

  getPendingPrescriptions(req, res, next) {}

  updatePrescription(req, res, next) {}
}

export default PrescriptionController;
