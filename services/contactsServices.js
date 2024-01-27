import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const contactListBuffer = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactListBuffer.toString());

    return contactList;
  } catch (error) {
    return error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contactListBuffer = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactListBuffer.toString());

    const targetContact =
      contactList.find((contact) => contact.id === contactId) || null;

    return targetContact;
  } catch (error) {
    return error;
  }
};

export const addContact = async ({ name, email, phone }) => {
  const newContact = { id: nanoid(), name, email, phone };

  try {
    const contactListBuffer = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactListBuffer.toString());
    const contactUpdatedList = [...contactList, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contactUpdatedList));

    return newContact;
  } catch (error) {
    return error;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contactListBuffer = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactListBuffer.toString());

    const contactUpdatedList = [];
    let removedContact = null;

    for (const contact of contactList) {
      if (contact.id === contactId) {
        removedContact = contact;
        continue;
      }

      contactUpdatedList.push(contact);
    }

    if (contactList.length === contactUpdatedList.length) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(contactUpdatedList));

    return removedContact;
  } catch (error) {
    return error;
  }
};

export const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contactList = await listContacts();
    const contactUpdatedList = [];
    const updatedContact = {};

    for (const contact of contactList) {
      if (contact.id !== contactId) {
        contactUpdatedList.push(contact);
        continue;
      }

      updatedContact.id = contact.id;
      updatedContact.name = name || contact.name;
      updatedContact.email = email || contact.email;
      updatedContact.phone = phone || contact.phone;

      contactUpdatedList.push(updatedContact);
    }

    if (JSON.stringify(contactList) === JSON.stringify(contactUpdatedList)) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(contactUpdatedList));

    return updatedContact;
  } catch (error) {
    return error;
  }
};
