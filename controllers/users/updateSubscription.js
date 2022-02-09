const { User } = require("../../models/user");
const CreateError = require("http-errors");

const updateSubscription = async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        if (!result) {
            throw new CreateError(404, "Not found");
        }
        res.json({
            email: result.email,
            subscription: result.subscription,
        }
        );
    } catch (error) {
        next(error);
    }
}

module.exports = updateSubscription;