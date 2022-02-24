const { User, schemas } = require("../../models/user");
const CreateError = require("http-errors");
// const Joi = require("joi");

const {sendMail} = require("../../helpers")

const verify = async (req, res, next) => {
    try {
        const {error} = schemas.verify.validate(req.body);
        if (error) {
            throw CreateError(400, 'missing required field email');
        }
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user.verify) {
            throw CreateError(400, "Verification has already been passed")
        }
        const mail = {
            to: email,
            subject: "Підтвердження email",
            html: `<a href='http://localhost:8080/api/users/${user.verificationToken}>Натисніть щоб підтвердити</a>'`
        }
        sendMail(mail);
        res.json({
            message: 'Verification email sent'
        })
    } catch (error) {
        next(error);
    }
}

module.exports = verify;