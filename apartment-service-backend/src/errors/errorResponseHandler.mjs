import AuthNZErrorHandler from './authNZErrorHandler.mjs';
import DbErrorHandler from './dbErrorHandler.mjs';

export default class ErrorResponseHandler {
  constructor() {
    this.handleGlobalErrors = this.handleGlobalErrors.bind(this);
  }

  sendError(err, res) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message || err.errorMessage,
        ...(process.env.NODE_ENV === 'development' && {
          stack: err.stack,
        }),
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong',
      });
    }
  }

  handleGlobalErrors(err, req, res, next) {
    const dbErroHandler = new DbErrorHandler();
    const authNZErrorHandler = new AuthNZErrorHandler();

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err };
    error =
      dbErroHandler.handleErrors(err) ||
      authNZErrorHandler.handleErrors(err) ||
      error;
    this.sendError(error, res);
  }
}
