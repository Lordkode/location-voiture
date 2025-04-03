const { CustomError } = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  // If error instance of CustomError, handle error message with status code
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Else it's server error
  return res.status(500).json({
    error: "Internal server error",
  });
};

module.exports = errorMiddleware;
