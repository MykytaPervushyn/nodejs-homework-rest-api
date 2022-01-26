const fs = require('fs/promises')
const path = require('path');
const { v1 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(i => i.id === id);
  if (!result) {
    return null;
  }
  return result;}

const removeContact = async (id) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(i => i.id === id);
    if(idx === -1){
        return null;
    }
  const deleteContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return deleteContact;
}

const addContact = async (name, email, phone) => {
  const data = { name, email, phone, id: v1() };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return data;
}

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(i => i.id === id);
    if(idx === -1){
        return null;
  }
  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
