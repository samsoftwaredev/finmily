import { NextFunction, Response, Request } from 'express';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import _schema from '../_schema';
import { ValidationTypeEnum } from '../utils';

const ajv = new Ajv({ allErrors: true }); // options can be passed,
addFormats(ajv);

// validation middleware
const validationHandlerMiddleware = (
  schema: object,
  reqType: ValidationTypeEnum = ValidationTypeEnum.BODY,
) => {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req[reqType])) return res.status(400).json(validate.errors);
    return next();
  };
};

const validateParamUUID = validationHandlerMiddleware(
  _schema['ID'],
  ValidationTypeEnum.PARAMS,
);

export { validateParamUUID };

export default validationHandlerMiddleware;
