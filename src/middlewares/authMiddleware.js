const loginService = require('../resources/login/login.service');
const RequestError = require('../helpers/requestError');

const authMiddleware = (req, res, next) => {
  const rout = req.url.split('/')[1];
  if (rout === 'login' || rout === 'doc' || rout === '') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new RequestError(401, 'Unauthorized');
  }

  const token = authHeader.substring(7);
  const authTrue = loginService.checkLogin(token);
  if (!authTrue) {
    throw new RequestError(401, 'Unauthorized');
  }

  next();
};

module.exports = authMiddleware;
