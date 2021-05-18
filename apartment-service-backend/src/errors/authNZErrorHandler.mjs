import AppError from './appError.mjs';

export default class AuthNZErrorHandler {
  constructor() {
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleInvalidTokenError(error) {
    if (error.name === 'JsonWebTokenError')
      return new AppError('Invalid token. Please login again', 401);
  }

  handleTokenExpiredError(error) {
    if (error.name === 'TokenExpiredError')
      return new AppError('TokenExpiredError', 401);
  }

  handleErrors(error) {
    return (
      this.handleInvalidTokenError(error) || this.handleTokenExpiredError(error)
    );
  }
}
