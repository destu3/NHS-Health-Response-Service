import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

const authController = new AuthController();

router.route('/login').post(authController.login());
router.route('/sign-up').post(authController.register());

export default router;
