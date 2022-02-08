const express = require('express');
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

// GET /api/contacts
router.get('/', authenticate, ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, ctrl.addContact);
router.delete('/:id', ctrl.deleteContact);
router.put('/:id', ctrl.updateContact);
router.patch('/:id/favorite', ctrl.setStatus);
router.get('/:id/favorite', ctrl.setStatus);

module.exports = router;
