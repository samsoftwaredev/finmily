import { expressjwt } from 'express-jwt';
const jwks = require('jwks-rsa');

const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://finmily.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://finmily/api',
  issuer: 'https://finmily.us.auth0.com/',
  algorithms: ['RS256'],
});

export default jwtCheck;
