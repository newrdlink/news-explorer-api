const jwt = require('jsonwebtoken')
const { JWT_WORD } = require('../constants')

const decodeToken = async (token) => {
  try {
    const decodeToken = await jwt.verify(token.replace('Bearer ', ''), JWT_WORD)
    return decodeToken
  } catch (error) {
    return false;
  }
};

module.exports = decodeToken
