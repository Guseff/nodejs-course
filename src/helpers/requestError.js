class RequestError extends Error {
  constructor(code = 404, message = 'Not found') {
    super();
    this.message = message;
    this.code = code;
  }
}

module.exports = RequestError;
