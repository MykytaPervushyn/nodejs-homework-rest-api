const current = async (req, res, next) => {
    res.json({
        email: req.user.email,
        subscription: "starter"
    })
}

module.exports = current;