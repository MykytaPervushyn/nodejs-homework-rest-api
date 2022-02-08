const { Contact } = require("../../models/contact");
const CreateError = require("http-errors");

const deleteContact = async (req, res, next) => {
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
}

module.exports = deleteContact;