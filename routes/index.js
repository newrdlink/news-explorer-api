const router = require('express').Router()
const auth = require('../middlewares/auth')
const usersRoute = require('./users')
const articlesRoute = require('./articles')
const { userCreate, login } = require('../controllers/users.js')
const { isValidBodyCreateUser, isValidBodyLoginUser, isAuthInHeaders } = require('../utils/validateRequest')


router.post('/signup', isValidBodyCreateUser(), userCreate)
router.post('/signin', isValidBodyLoginUser(), login)
router.use('/', isAuthInHeaders(), auth)
router.use('/users', usersRoute)
router.use('/articles', articlesRoute)

module.exports = router
