const { User, schemas } = require("../../models/user");
const CreateError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { sendMail } = require("../../helpers");

const signup = async (req, res, next) => {
    try {
        const { error } = schemas.signup.validate(req.body);
        if (error) {
            throw new CreateError(400, "Помилка від Joi або іншої бібліотеки валідації")
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new CreateError(409, 'Email in use');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email);
        const verificationToken = v4();
        await User.create({
            email,
            avatarURL,
            password: hashPassword,
            verificationToken
        });
        const mail = {
            to: email,
            subject: "Підтвердження email",
            html: `<a target="_blank" href='http://localhost:8080/api/users/verify/${verificationToken}'>Натисніть щоб підтвердити</a>`
        }
        await sendMail(mail);
        res.status(201).json({
            user: {
                email: email,
                subscription: "starter"
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = signup;