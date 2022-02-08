const { Contact, schemas } = require("../../models/contact");
const CreateError = require("http-errors");

const setStatus = async (req, res, next) => {
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
}

module.exports = setStatus;