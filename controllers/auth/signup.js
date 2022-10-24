const bcrypt = require("bcryptjs")
const { User } = require("../../models")
const { RequestError } = require("../../helpers")
const gravatar = require("gravatar")

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email,)
  const newUser = await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    email: newUser.email,
    avatarURL,
    subscription: "starter",
  })
}

module.exports = signup;