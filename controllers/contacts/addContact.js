const { Contact, schemas } = require("../../models/contact");
const CreateError = require("http-errors");

const addContact = async (req, res, next) => {
  try {
    const {error} = schemas.add.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field")
    }
    const data = { ...req.body, owner: req.user._id };
    const result = await Contact.create(data);
    res.status(201).json(result)
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = addContact;