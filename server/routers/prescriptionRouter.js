import express from 'express';
import PrescriptionController from '../controllers/PrescriptionController.js';

const prescriptionController = new PrescriptionController();

const router = express.Router();

router.post('/request', prescriptionController.requestPrescription());
router.post('/', prescriptionController.getPendingPrescriptions());
router.patch('/:id', prescriptionController.updatePrescription());

export default router;
