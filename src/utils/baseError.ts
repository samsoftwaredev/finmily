import { HttpStatusCode } from "./enum";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  // isOperational means that the server doesn't need to restart
  // therefore the error isTrustedError
  public readonly isOperational: boolean = false;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational?: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational

    Error.captureStackTrace(this);
  }
}

//free to extend the BaseError
export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    description = "internal server error",
    isOperational = true,
  ) {
    super(name, httpCode, description, isOperational);
  }
}

export class HTTP404Error extends BaseError {
  constructor(description = "We couldn't find what you were looking for") {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, description, true);
  }
}

export class HTTP400Error extends BaseError {
  constructor(description = "Bad request") {
    super("NOT VALID", HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export class HTTP500Error extends BaseError {
  constructor(description = "Internal server error") {
    super("ERROR", HttpStatusCode.INTERNAL_SERVER_ERROR, description, true);
  }
}
