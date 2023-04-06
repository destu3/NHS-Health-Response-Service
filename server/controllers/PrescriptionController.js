import _Prescription from '../models/Prescription.js';
import HandlerFactory from '../classes/HandlerFactory.js';

const handlerFactory = new HandlerFactory(_Prescription);

class PrescriptionController {
  constructor(Prescription = _Prescription) {
    this.Prescription = Prescription;
  }

  requestPrescription() {
    return handlerFactory.createOne();
  }

  getPendingPrescriptions() {
    return handlerFactory.getMany();
  }

  updatePrescription() {
    return handlerFactory.update();
  }
}

export default PrescriptionController;
