const { NODE_ENV, JWT_SECRET } = process.env

const JWT_WORD = NODE_ENV === 'PROD' ? JWT_SECRET : 'The time has come'

module.exports = JWT_WORD