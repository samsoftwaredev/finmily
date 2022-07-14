import { NextFunction, Response, Request } from 'express';
import { BaseError, FatalError, log } from '../utils';

// how to implement error handling middleware
// http://expressjs.com/en/guide/error-handling.html
// source of reference: https://www.toptal.com/nodejs/node-js-error-handling
class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await log.fatal(
      'FATAL: Error message from the centralized error-handling component',
      err,
    );
    // TODO: implement notifications for errors
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

const errorHandlerMiddleware = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorHandler = new ErrorHandler();
  if (errorHandler.isTrustedError(err)) {
    return next(err);
  }
  await errorHandler.handleError(err);

  const internalError = new FatalError();
  res.status(internalError.httpCode).json(internalError);
};

export default errorHandlerMiddleware;
