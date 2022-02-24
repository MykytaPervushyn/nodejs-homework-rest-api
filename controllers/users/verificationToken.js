const { User } = require("../../models/user");
const CreateError = require("http-errors");

const verificationToken = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({verificationToken});
        if (!user) {
            throw CreateError(404, 'Not found');
        }
        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
        res.json({
            message: 'Verification successful'
        })
    } catch (error) {
        next(error);
    }
}

module.exports = verificationToken;