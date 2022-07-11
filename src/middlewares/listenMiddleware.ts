import { log } from "../utils";

const listen = (req, res, next) => {
  log.debug("Request URL: " + req.originalUrl);
  next();
};

export default listen;
