import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './src/users/userRoutes.mjs';
import apartmentRouter from './src/apartments/apartmentRoutes.mjs';
import AppError from './src/errors/appError.mjs';
import ErrorResponseHandler from './src/errors/errorResponseHandler.mjs';

const app = express();
const errorHandler = new ErrorResponseHandler();

// Implement CORS
app.use(cors());
app.options('*', cors());

// Set security http headers
app.use(helmet());

// Body parser, reading data from body into req.body if required
app.use(express.json());

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp() // { whitelist: '' }
);

app.use('/api/v1/apartments', apartmentRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const error = next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
  next(error);
});
app.use(errorHandler.handleGlobalErrors);

export default app;
