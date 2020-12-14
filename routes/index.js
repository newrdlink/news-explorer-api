const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoute = require('./users');
const articlesRoute = require('./articles');
const { userCreate, login } = require('../controllers/users.js');
const { isValidBodyCreateUser, isValidBodyLoginUser } = require('../utils/validateRequest');
const badPathReq = require('../middlewares/badPathError');

router.post('/signup', isValidBodyCreateUser(), userCreate);
router.post('/signin', isValidBodyLoginUser(), login);

router.use('/', auth);
router.use('/users', usersRoute);
router.use('/articles', articlesRoute);

router.use(badPathReq);

module.exports = router;
