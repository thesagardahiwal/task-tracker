import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let status = 'error';
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  // Handle Mongoose/MongoDB specific errors here if needed
  // ...

  res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
