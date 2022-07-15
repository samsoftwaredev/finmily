import { NextFunction, Response, Request } from 'express';
import Ajv from 'ajv';

const ajv = new Ajv(); // options can be passed,

// validation middleware
const validationHandlerMiddleware = (schema: object) => {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
};

export default validationHandlerMiddleware;
