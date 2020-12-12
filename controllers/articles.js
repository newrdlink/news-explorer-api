const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const NotAccessError = require('../errors/not-access-err');
const { notFoundErrors, notAccessErrors } = require('../constants/errorMessages');

const getArticles = (req, res, next) => {
  const { id: userId } = req.user;

  Article.find({}).select('+owner')
    .then((articles) => {
      const listArticles = articles.filter((article) => article.owner.toString() === userId);
      res.send(listArticles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const { id: userId } = req.user;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: userId,
  })
    .then((article) => res.send(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId: _id } = req.params;
  const { id: userId } = req.user;

  Article.findById({ _id }).select('+owner')
    .orFail(() => {
      throw new NotFoundError(notFoundErrors.articleNotFound);
    })
    .then((article) => {
      if (article.owner.toString() === userId) {
        Article.deleteOne({ _id })
          .then(() => res.send({ _id }))
          .catch(next);
      } else throw new NotAccessError(notAccessErrors.forbidden);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
