const express = require("express");
const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.get('/current', authenticate, ctrl.current)

router.get('/logout', authenticate, ctrl.logout)

router.patch('/', authenticate, ctrl.updateSubscription)

module.exports = router;