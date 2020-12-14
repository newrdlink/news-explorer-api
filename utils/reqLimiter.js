const rateLimit = require('express-rate-limit');

const limiterApp = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = limiterApp;
