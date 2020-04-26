const HttpStatus = require('http-status-codes');
const router = require('express').Router();
const errorCatcher = require('../../helpers/errorCatcher');
const RequestError = require('../../helpers/requestError');
const loginService = require('./login.service');

router.route('/').post(
  errorCatcher(async (req, res) => {
    const token = await loginService.postLogin(req.body);
    if (!token) {
      throw new RequestError(HttpStatus.FORBIDDEN, 'Forbidden');
    }
    res.status(HttpStatus.OK).send({ token });
  })
);

module.exports = router;
