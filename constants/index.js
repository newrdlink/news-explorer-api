const { NODE_ENV, JWT_SECRET } = process.env;

const JWT_WORD = NODE_ENV === 'PROD' ? JWT_SECRET : 'The time has come';

const allowedCors = [
  'localhost:3000',
];

const SALT_ROUND = 10;

module.exports = { JWT_WORD, allowedCors, SALT_ROUND };
