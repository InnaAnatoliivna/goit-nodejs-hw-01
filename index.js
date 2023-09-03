const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./utils/contacts");
const { Command } = require("commander");
const program = new Command();

program.version("1.0.0").description("Contacts Management System");

program
    .command("list")
    .description("List all contacts")
    .action(() => listContacts().then(console.table).catch(console.error));

program
    .command("get <id>")
    .description("Get a contact by ID")
    .action((id) => getContactById(id).then(console.log).catch(console.error));

program
    .command("add <name> <email> <phone>")
    .description("Add a new contact")
    .action((name, email, phone) =>
        addContact(name, email, phone)
            .then((contact) => console.log("Contact added:", contact))
            .catch(console.error)
    );

program
    .command("remove <id>")
    .description("Remove a contact by ID")
    .action((id) => removeContact(id).then(console.log).catch(console.error));

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            listContacts().then(console.table).catch(console.error);
            break;

        case "get":
            getContactById(id)
                .then((contact) => {
                    if (contact) {
                        console.log(contact);
                    } else {
                        console.log("Contact not found");
                    }
                })
                .catch(console.error);
            break;

        case "add":
            addContact(name, email, phone)
                .then((contact) => console.log("Contact added:", contact))
                .catch(console.error);
            break;

        case "remove":
            removeContact(id)
                .then((contactId) => {
                    if (contactId) {
                        console.log("Contact removed:", contactId);
                    } else {
                        console.log("Contact not found");
                    }
                })
                .catch(console.error);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

// invokeAction(argv);
