import { NextFunction, Response, Request } from 'express';
import { BaseError, HttpStatusCode, log } from '../utils';

// how to implement error handling middleware
// http://expressjs.com/en/guide/error-handling.html
// source of reference: https://www.toptal.com/nodejs/node-js-error-handling
class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await log.error(
      'Error message from the centralized error-handling component',
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
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorHandler = new ErrorHandler();
  log.info('called');
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    name: 'UNKNOWN ERROR',
    message: 'Something went wrong.',
  });
};

export default errorHandlerMiddleware;
