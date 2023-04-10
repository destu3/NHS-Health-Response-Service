// catch and handle errors in async functions
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};

export default catchAsync;