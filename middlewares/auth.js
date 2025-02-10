const { getUser } = require("../service/auth");

function checkAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (req.headers["x-bot-request"]) {
    // If bot request, create a dummy bot user
    req.user = { email: "bot@gmail.com", role: "ADMIN" };
    return next();
  }

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles) {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    next();
  };
}

module.exports = { checkAuthentication, restrictTo };
