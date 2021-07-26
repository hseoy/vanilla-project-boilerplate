import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../../utils/errorResponse';

const createErrorInfoDevelopment = (err: ErrorResponse) => {
  return {
    success: false,
    statusCode: err?.statusCode || 500,
    message: err.message,
    stack: err.stacks || err.stack,
  };
};

const createErrorInfoProduction = (err: ErrorResponse) => {
  return {
    success: false,
    statusCode: err?.statusCode || 500,
    message: err.isOperational ? err.message : 'Something went very wrong',
  };
};

const errorHandler = (
  err: ErrorResponse,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let errorInfo;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    errorInfo = createErrorInfoDevelopment(err);
  } else {
    errorInfo = createErrorInfoProduction(err);
  }

  res.status(errorInfo.statusCode).json(errorInfo);
};

export default errorHandler;
