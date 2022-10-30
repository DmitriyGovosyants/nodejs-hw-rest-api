const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");
const { User } = require("../../models")

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400)
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed")
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent"
  })

  // const { verificationToken } = req.params;
  // const user = await User.findOne({ verificationToken });
  // if (!user) {
  //   throw RequestError(404, "User not found");
  // }

  // await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  // res.status(200).json({
  //   message: "Verification successful"
  // })
}

module.exports = resendVerify;