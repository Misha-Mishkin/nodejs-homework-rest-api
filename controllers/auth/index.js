const signup = require("../auth/signup");
const login = require("../auth/login");
const verifyEmail = require("../auth/verifyEmail");
const resendVerifyEmail = require("../auth/resendVerifyEmail");

module.exports = {
  signup,
  login,
  verifyEmail,
  resendVerifyEmail,
};
