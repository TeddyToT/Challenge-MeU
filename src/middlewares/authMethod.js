const auth = require('./auth'); 

const protectedMethods = ['POST', 'PUT', 'DELETE'];

module.exports = function (req, res, next) {
  if (protectedMethods.includes(req.method.toUpperCase())) {
    return auth(req, res, next);
  }
  next();
};
