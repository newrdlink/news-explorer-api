const { celebrate, Joi } = require('celebrate');

const isValidBodyCreateUser = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(26),
  }),
});

const isValidBodyLoginUser = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const isValidBodyCreateArticle = () => celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required(),
    text: Joi.string().min(6),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

const isAuthInHeaders = () => celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  isValidBodyCreateUser,
  isValidBodyLoginUser,
  isValidBodyCreateArticle,
  isAuthInHeaders,
};
