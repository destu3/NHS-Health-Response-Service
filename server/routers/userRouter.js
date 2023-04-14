import express from 'express';
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';

const router = express.Router();

const userController = new UserController();
const authController = new AuthController();

router.route('/login').post(authController.login());
router.route('/sign-up').post(authController.register());
router.get('/doctors', userController.getDoctors());

router
  .route('/:id')
  .post(userController.getInfo())
  .patch(userController.updateInfo());

export default router;
