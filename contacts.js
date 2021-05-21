const fs = require("fs").promises;
const path = require("path");

const contactsPath = "./db/contacts.json";

async function listContacts() {
  try {
    let data = await fs.readFile(contactsPath, (data) => data);
    data = JSON.parse(data);
    console.table(data);
  } catch (error) {
    console.error(error);
  }
}
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, (data) => data);
    const elem = JSON.parse(data).filter((el) => el.id === contactId)[0];
    console.table(elem);
  } catch (error) {
    console.error(error);
  }
}
async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, (data) => data);
    data = JSON.parse(data);
    const elem = data.find((el) => el.id === contactId);
    const newData = data.filter((el) => el.id !== elem.id);
    try {
      await fs.writeFile(contactsPath, JSON.stringify(newData));
      console.log(`contact with id ${elem.id} has removed`);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
async function addContact(name, email, phone) {
  try {
    let data = await fs.readFile(contactsPath, (data) => data);
    data = JSON.parse(data);
    const lastId = data[data.length - 1].id;
    const newData = [...data, { id: lastId + 1, name, email, phone }];
    try {
      await fs.writeFile(contactsPath, JSON.stringify(newData));
      console.log(`contact add`);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
