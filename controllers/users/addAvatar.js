const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const addAvatar = async (req, res, next) => {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;
    try {
        const [extention] = filename.split(".").reverse();
        const newFileName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, newFileName);
        const file = await Jimp.read(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", newFileName);
        file.resize(250, 250).write(resultUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL
        })
    } catch (error) {
        next(error);
    }
}

module.exports = addAvatar;