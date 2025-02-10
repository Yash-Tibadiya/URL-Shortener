const JWT = require("jsonwebtoken");
const JWT_SECRET = "Yash$123@abc";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  return JWT.sign(payload, JWT_SECRET);
}

function getUser(token) {
  if (!token) return null;
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
