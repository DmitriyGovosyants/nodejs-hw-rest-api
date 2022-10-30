const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Нажмите для подтверждение</a>`
  }
  return mail;
}

module.exports = createVerifyEmail;