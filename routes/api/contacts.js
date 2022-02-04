const express = require('express');
const CreateError = require("http-errors");

const {Contact, schemas} = require("../../models/contact");

const router = express.Router()

// GET /api/contacts
router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt")
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field")
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result)
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field")
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.patch('/:id/favorite', async (req, res, next) => {
  try {
    const {error} = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing field favorite")
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

module.exports = router
