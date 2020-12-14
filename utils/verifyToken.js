const jwt = require('jsonwebtoken');
const { JWT_WORD } = require('../config');
const bearerStr = require('../constants');

const decodeToken = async (token) => {
  try {
    const decodingToken = await jwt.verify(token.replace(bearerStr, ''), JWT_WORD);
    return decodingToken;
  } catch (error) {
    return false;
  }
};

module.exports = decodeToken;
