import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const categoryController = new CategoryController();

const router = express.Router();

router
  .route('/')
  .post(categoryController.addCategory())
  .get(categoryController.getCategories());

router
  .route('/:id')
  .patch(categoryController.updateCategory())
  .delete(categoryController.deleteCategory());

export default router;
