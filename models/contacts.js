const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const updateContacts = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contact.push(newContact);
  await updateContacts(contact);
  return newContact;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const idx = contact.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = contact.splice(idx, 1);
  await updateContacts(contact);
  return result;
};

const updateContact = async (id, { name, email, phone }) => {
  const contact = await listContacts();
  const idx = contact.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contact[idx] = { id, name, email, phone };
  await updateContacts(contact);
  return contact[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
