const {
  NODE_ENV,
  JWT_SECRET,
  BD_ADDRESS,
  PORT = 3000,
} = process.env;

const production = () => NODE_ENV === 'production';

const JWT_WORD = production() ? JWT_SECRET : 'The time has come';
const BD_ADD = production() ? BD_ADDRESS : 'mongodb://localhost:27017/newsexplorerbd';

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
];

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// };

const SALT_ROUND = 10;

module.exports = {
  JWT_WORD,
  allowedCors,
  SALT_ROUND,
  BD_ADD,
  PORT,
};
