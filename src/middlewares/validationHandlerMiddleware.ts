import { NextFunction, Response, Request } from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true }); // options can be passed,
addFormats(ajv);

// validation middleware
const validationHandlerMiddleware = (schema: object) => {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
};

export default validationHandlerMiddleware;
