const fs = require("fs/promises");
const path = require("path");

const contactsPath = "./db/contacts.json";

async function listContacts() {
  let data = await fs.readFile(contactsPath, (data) => data);
  data = JSON.parse(data);
  console.table(data);
}
async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, (data) => data);
  const elem = JSON.parse(data).filter((el) => el.id === contactId)[0];
  console.table(elem);
}
async function removeContact(contactId) {
  let data = await fs.readFile(contactsPath, (data) => data);
  data = JSON.parse(data);
  const newData = data.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newData));
  console.log(`Contact with id ${contactId} has removed`);
}
async function addContact(name, email, phone) {
  let data = await fs.readFile(contactsPath, (data) => data);
  data = JSON.parse(data);
  const lastId = data[data.length - 1].id;
  const newData = [...data, { id: lastId + 1, name, email, phone }];
  await fs.writeFile(contactsPath, JSON.stringify(newData));
  console.log(`contact add`);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
