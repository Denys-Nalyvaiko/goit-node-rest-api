import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const contactListBuffer = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactListBuffer.toString());

    if (!contactList.length) {
      return "Contact List is Empty";
    }

    return contactList;
  } catch (error) {
    return error;
  }
};

export const getContactById = async (contactId) => {
  if (!contactId) {
    return "You need enter contact id";
  }

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

export const addContact = async (name, email, phone) => {
  const newContact = { id: nanoid(), name, email, phone };
  const hasUserAllProps = Object.values(newContact).every((prop) => prop);

  if (!hasUserAllProps) {
    return "You need fill all fields";
  }

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
  if (!contactId) {
    return "You need enter contact id";
  }

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
