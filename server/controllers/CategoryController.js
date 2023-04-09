import _ServiceCategory from '../models/ServiceCategory.js';
import HandlerFactory from '../classes/HandlerFactory.js';

const handlerFactory = new HandlerFactory(_ServiceCategory);

class CategoryController {
  constructor(ServiceCategory = _ServiceCategory) {
    this.ServiceCategory = ServiceCategory;
  }

  addCategory() {
    return handlerFactory.createOne();
  }

  updateCategory() {
    return handlerFactory.update();
  }

  deleteCategory() {
    return handlerFactory.delete();
  }

  getCategories() {
    return handlerFactory.getMany();
  }
}

export default CategoryController;
