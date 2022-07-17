import { NextFunction, Request, Response } from 'express';
import { log } from '../utils';

const listen = (req: Request, res: Response, next: NextFunction) => {
  log.debug('Request URL: ' + req.originalUrl);
  log.debug('Request Body: ', req.body);
  next();
};

export default listen;
