const router = require('express').Router()
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles')

router.get('/', getArticles)
router.post('/', createArticle)
router.delete('/', deleteArticle)

module.exports = router
