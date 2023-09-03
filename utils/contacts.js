const fs = require('fs').promises;
const path = require('path');
const { uuid } = require('uuidv4');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

/**
 * Returns list all contacts
 * @returns {Promise<Array>} Array contacts.
 */
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

/**
 *  Returns contact by its id
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of contact or 'null' if contact is not found.
 */
async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contact.id === contactId) || null;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a contact by its ID
 * @param {string} contactId - ID of the contact.
 * @returns {Promise<Object|null>} Object of deleted contact or 'null' if contact is not found.
 */
async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const removedContact = contacts.find(contact => contact.id === contactId);
        if (!removedContact) return null;
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return removedContact;
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a new contact to the list contacts.
 * @param {string} name - Contact name.
 * @param {string} email - Contact Email.
 * @param {string} phone - Contact Phone.
 * @returns {Promise<Object>} The object of the added contact. 
 */
async function addContact(name, email, phone) {
    try {
        const newContact = { id: uuid(), name, email, phone };
        const contacts = await listContacts();
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        throw error;
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };   
