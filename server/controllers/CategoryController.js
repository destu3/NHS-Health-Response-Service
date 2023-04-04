import _ServiceCategory from '../models/ServiceCategory';

class CategoryController {
  constructor(ServiceCategory = _ServiceCategory) {
    this.ServiceCategory = ServiceCategory;
  }

  addCategory(req, res, next) {}

  updateCategory(req, res, next) {}

  deleteCategory(req, res, next) {}

  getCategories(req, res, next) {}
}

export default CategoryController;
