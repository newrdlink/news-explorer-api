const jwt = require('jsonwebtoken')
const JWT_WORD = require('../constants')

const verifyToken = async (token) => {
  try {
    const decodeToken = await jwt.verify(token.replace('Bearer ', ''), JWT_WORD)
    return decodeToken
  } catch (error) {
    return false;
  }
};

module.exports = verifyToken
