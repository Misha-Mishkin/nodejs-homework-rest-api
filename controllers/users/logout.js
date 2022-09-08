const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  if (!_id) {
    throw RequestError(401, "Not authorized");
  }
  res.status(204).send();
};

module.exports = logout;
