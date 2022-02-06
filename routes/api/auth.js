const express = require("express");
const CreateError = require("http-errors");

const {User, schemas} = require("../../models/user");

const router = express.Router();

// auth/signup
router.post("/signup", async (req, res, next) => {
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
        const result = await User.create({ email, password });
        res.status(201).json({
            user: {
                email,
                subscription
            }
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;