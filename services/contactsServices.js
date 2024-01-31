import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { Types } from "mongoose";
import { Contact } from "../models/contactsModel.js";
import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = () => Contact.find();

export const getContactById = async (contactId) => Contact.findById(contactId);

export const addContact = async (contact) => Contact.create(contact);

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
    let isValidId = false;

    for (const contact of contactList) {
      if (contact.id !== contactId) {
        contactUpdatedList.push(contact);
        continue;
      }

      isValidId = true;

      updatedContact.id = contact.id;
      updatedContact.name = name || contact.name;
      updatedContact.email = email || contact.email;
      updatedContact.phone = phone || contact.phone;

      contactUpdatedList.push(updatedContact);
    }

    if (!isValidId) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(contactUpdatedList));

    return updatedContact;
  } catch (error) {
    return error;
  }
};

export const checkContactId = (contactId) => {
  const isValidId = Types.ObjectId.isValid(contactId);
  const isUserExists = Contact.exists({ _id: contactId });

  if (!isValidId || !isUserExists) {
    throw HttpError(404);
  }
};
