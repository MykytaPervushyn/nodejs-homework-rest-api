const express = require("express");
const { authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.get("/verify/:verificationToken", ctrl.verificationToken)

router.post("/verify", ctrl.verify)

router.get('/current', authenticate, ctrl.current)

router.get('/logout', authenticate, ctrl.logout)

router.patch('/', authenticate, ctrl.updateSubscription)

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.addAvatar)

module.exports = router;