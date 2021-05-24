const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts().catch((error) => console.error(error));
      break;
    case "get":
      await getContactById(id).catch((error) => console.error(error));
      break;
    case "add":
      await addContact(name, email, phone).catch((error) =>
        console.error(error)
      );
      break;
    case "remove":
      await removeContact(id).catch((error) => console.error(error));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
