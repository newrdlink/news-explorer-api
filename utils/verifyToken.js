const jwt = require('jsonwebtoken');
const { JWT_WORD, bearerStr } = require('../constants');

const decodeToken = async (token) => {
  try {
    const decodingToken = await jwt.verify(token.replace(bearerStr, ''), JWT_WORD);
    return decodingToken;
  } catch (error) {
    return false;
  }
};

module.exports = decodeToken;
