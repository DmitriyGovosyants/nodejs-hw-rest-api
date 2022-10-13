const {Contact} = require("../../models")
const { RequestError } = require("../../helpers")

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!updatedContact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(updatedContact);
}

module.exports = updateStatusContact;