const fs = require("fs/promises")
const path = require("path")
const { User } = require("../../models")
const jimp = require("jimp")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, filename);

    jimp
      .read(tempUpload)
      .then(avatar => {
        return avatar
          .resize(250, 250)
          .write(resultUpload)
      })
      .catch(err => {
        console.log(err)
      })

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL
    })

  } catch (error) {
    await fs.unlink(req.file.path)
    throw error;
  }
}

module.exports = updateAvatar;