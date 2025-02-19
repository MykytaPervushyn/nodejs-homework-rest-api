const { Contact } = require("../../models/contact");
const CreateError = require("http-errors");

const getById = async (req, res, next) => {
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
}

module.exports = getById;