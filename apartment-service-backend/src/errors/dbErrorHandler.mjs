import AppError from './appError.mjs';

export default class DbErrorHandler {
  constructor() {
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleCastError(err) {
    // eg: passing invalid id in get apartment
    if (err.name === 'CastError') {
      const message = `Invalid ${err.path} : ${err.value}`;
      return new AppError(message, 400);
    }
  }

  handleDuplicateFieldError(err) {
    // eg: entering duplicate value
    if (err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      const message = `Duplicate field value: ${value}. Please use another value!`;
      return new AppError(message, 400);
    }
  }

  handleValidationError(err) {
    // eg: if input is availiable1234
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data. ${errors.join('. ')}`;
      return new AppError(message, 400);
    }
  }

  handleErrors(err) {
    return (
      this.handleCastError(err) ||
      this.handleDuplicateFieldError(err) ||
      this.handleValidationError(err)
    );
  }
}
