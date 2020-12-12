const { generalErrors } = require('../constants/errorMessages');

module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).send({ message: generalErrors.emailRepeat });
  }
  if (error.kind === 'ObjectId') {
    return res.status(400).send({ message: generalErrors.failData });
  }
  next();
  // return res.status(error.statusCode || 500).send(error);
  return res.status(error.statusCode || 500).send({ message: error.message });
};
