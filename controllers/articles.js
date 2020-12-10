const Article = require('../models/article')
const NotFoundError = require('../errors')

const getArticles = (req, res, next) => {

  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next)
}

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body
  const { id: userId } = req.user

  Article.create({ keyword, title, text, date, source, link, image, owner: userId })
    .then((article) => res.send(article))
    .catch(next)
}

const deleteArticle = (req, res, next) => {
  const { id: _id } = req.body

  Article.findByIdAndRemove({ _id })
    .orFail(() => {
      const error = new NotFoundError('Уже нет такой статьи');
      throw error
    })
    .then((article) => res.send(article))
    .catch(next)
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
}