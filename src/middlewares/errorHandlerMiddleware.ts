import { NextFunction, Response, Request } from 'express';
import { APIError, BaseError, FatalError, log } from '../utils';

// how to implement error handling middleware
// http://expressjs.com/en/guide/error-handling.html
// source of reference: https://www.toptal.com/nodejs/node-js-error-handling
class ErrorHandler {
  public async handleError(err: Error): Promise<BaseError> {
    if (err instanceof SyntaxError) {
      log.error('Syntax Error', err);
      return new APIError('Syntax Error', 'This might be a simple typo');
    } else {
      await log.fatal(
        'FATAL: Error message from the centralized error-handling',
        err,
      );
      // TODO: implement notifications for errors
      // await sendMailToAdminIfCritical();
      // await sendEventsToSentry();
      return new FatalError();
    }
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

  const internalError: BaseError = await errorHandler.handleError(err);
  res.status(internalError.httpCode).json(internalError);
};

export default errorHandlerMiddleware;
