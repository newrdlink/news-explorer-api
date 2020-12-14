const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { isValidBodyCreateArticle, isValidReqIdArticleDelete } = require('../utils/validateRequest');

router.get('/', getArticles);
router.post('/', isValidBodyCreateArticle(), createArticle);
router.delete('/:articleId', isValidReqIdArticleDelete(), deleteArticle);

module.exports = router;
