class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name;
  }
}

module.exports = { CustomError };
