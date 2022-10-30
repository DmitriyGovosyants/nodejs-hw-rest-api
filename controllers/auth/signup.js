const bcrypt = require("bcryptjs")
const { User } = require("../../models")
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
  const mail = createVerifyEmail(email, verificationToken)
  await sendEmail(mail);

  res.status(201).json({
    email: newUser.email,
    avatarURL,
    subscription: "starter",
  })
}

module.exports = signup;