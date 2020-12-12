const NotFoundError = require('../errors/not-access-err');
const { notFoundErrors } = require('../constants/errorMessages');

module.exports = (req) => {
  const error = new NotFoundError(`${req.url + notFoundErrors.badPath}`);
  throw error;
};
