const { NotFoundError } = require('../errors');

module.exports = (req) => {
  const error = new NotFoundError(`Введенный путь ${req.url} - не допустимый`);
  error.statusCode = 404;
  throw error;
};
