const router = require('express').Router()
// const auth = require('../middlewares/Auth')
const usersRoute = require('./users')
const articlesRoute = require('./articles')
const { userCreate, login } = require('../controllers/users.js')
const { isValidBodyCreateUser, isValidBodyLoginUser } = require('../utils/validateBody')

// router.use('/', auth)
router.post('/signup', isValidBodyCreateUser(), userCreate)
router.post('/signin', isValidBodyLoginUser(), login)

router.use('/users', usersRoute)
router.use('/articles', articlesRoute)

module.exports = router
