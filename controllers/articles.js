const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const NotAccessError = require('../errors/not-access-err');
const DataFailError = require('../errors/data-fail-err');
const { notFoundErrors, notAccessErrors, generalErrors } = require('../constants/errorMessages');

const getArticles = (req, res, next) => {
  const { id: owner } = req.user;

  Article.find({ owner })
    .then((articles) => {
      res.send(articles);
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
  const { id: owner } = req.user;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
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
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return next(new DataFailError(generalErrors.failData));
      }
      return next(error);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
