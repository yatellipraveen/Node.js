const user = require("../helper/user-helper");

module.exports = function (req, res, next) {
  const cookies = req.cookies;
  if (!cookies.auth_token || !cookies.username) {
    return res.status(401).send();
  }

  if (!user.validToken(cookies.username, cookies.auth_token)) {
    return res.status(401).send();
  }
  next();
};
