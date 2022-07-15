import { HttpStatusCode } from './enum';

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  // isOperational means that the server doesn't need to restart
  // therefore the error isTrustedError
  public readonly description: string;
  public readonly isOperational: boolean = false;

  constructor(
    name: string,
    description: string,
    httpCode: HttpStatusCode,
    isOperational?: boolean,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(
    name,
    description = 'Internal server error',
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(name, description, httpCode, isOperational);
  }
}

export class HTTP404Error extends BaseError {
  constructor(description = "We couldn't find what you were looking for") {
    super('NOT FOUND', description, HttpStatusCode.NOT_FOUND, true);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description = 'Bad request') {
    super('NOT VALID', description, HttpStatusCode.BAD_REQUEST, true);
  }
}

export class HTTP500Error extends BaseError {
  constructor(description = 'Internal server error') {
    super('ERROR', description, HttpStatusCode.INTERNAL_SERVER_ERROR, true);
  }
}

export class FatalError extends BaseError {
  constructor(description = 'Something went wrong') {
    super('FATAL', description, HttpStatusCode.INTERNAL_SERVER_ERROR, false);
  }
}
