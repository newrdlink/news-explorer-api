class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotAccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  NotFoundError,
  NotAuthError,
  NotAccessError
};
