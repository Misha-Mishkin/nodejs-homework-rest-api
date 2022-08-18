const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const schemas = require("../../schema");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
