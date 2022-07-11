import { NextFunction, Response, Request } from "express";
import { BaseError, log } from "../utils";

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await log.error(
      'Error message from the centralized error-handling component',
      err,
    );
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
 export const errorHandler = new ErrorHandler();

const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(err);
};

export default errorHandlerMiddleware;
