import catchAsync from '../helpers/catchAsync.js';

class HandlerFactory {
  constructor(Model) {
    this.Model = Model;
  }

  getMany(populateOptions) {
    return catchAsync(async (req, res, next) => {
      let filterOpts = !req.body ? {} : req.body;

      let query = this.Model.find(filterOpts);
      if (populateOptions) {
        query.populate(populateOptions);
      }

      const docs = await query;

      // send response
      res
        .status(200)
        .json({ status: 'success', results: docs.length, data: { docs } });
    });
  }

  get(populateOptions) {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;

      let query = this.Model.findById(id);
      if (populateOptions) {
        query = query.populate(populateOptions);
      }

      const doc = await query;

      if (!doc) throw new Error(`Couldn't find resource with id ${id}`);

      // send response
      res.status(200).json({ status: 'success', data: { doc } });
    });
  }

  createOne() {
    return catchAsync(async (req, res, next) => {
      const data = req.body;

      const newDoc = await this.Model.create(data);
      if (newDoc.password) newDoc.password = undefined;

      res.status(201).json({ status: 'success', data: { newDoc } });
    });
  }

  update() {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const updatedData = req.body;

      const doc = await this.Model.findByIdAndUpdate(id, updatedData, {
        runValidators: true,
        new: true,
      });

      if (!doc) throw new Error(`Couldn't find resource with id ${id}`);

      res.status(200).json({ status: 'success', data: { doc } });
    });
  }

  delete() {
    return catchAsync(async (req, res, next) => {
      const id = req.params.id;

      const doc = await this.Model.findByIdAndDelete(id);

      if (!doc) throw new Error(`Couldn't find resource with id ${id}`);

      res.status(204).json({ status: 'success', data: null });
    });
  }
}

export default HandlerFactory;
