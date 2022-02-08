const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();


// auth/signup
router.post("/signup", ctrl.signup);
// /auth/login
router.post("/login", ctrl.login);

module.exports = router;