import { log } from '../utils';

const listen = (req, res, next) => {
  log.debug('Request URL: ' + req.originalUrl);
  log.debug('Request Body: ', req.body);
  next();
};

export default listen;
