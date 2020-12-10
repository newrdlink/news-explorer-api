const router = require('express').Router()
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles')
const { isValidBodyCreateArticle } = require('../utils/validateRequest')

router.get('/', getArticles)
router.post('/', isValidBodyCreateArticle(), createArticle)
router.delete('/', deleteArticle)

module.exports = router
