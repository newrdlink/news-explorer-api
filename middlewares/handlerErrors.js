module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).send({ message: 'Такой email уже есть' });
  }
  if (error.kind === 'ObjectId') {
    return res.status(400).send({ message: 'Дело в том, что это не валидные данные' });
  }
  next();
  return res.status(error.statusCode || 500).send({ message: error.message });
};
