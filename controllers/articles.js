const Article = require('../models/article');
const { NotFoundError, NotAccessError } = require('../errors');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
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
      throw new NotFoundError('Уже нет такой статьи');
    })
    .then((article) => {
      if (article.owner.toString() === userId) {
        Article.deleteOne({ _id })
          .then(() => res.send({ _id }))
          .catch(next);
      } else throw new NotAccessError('У вас нет прав');
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
