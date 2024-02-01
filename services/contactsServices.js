import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactsModel.js";

export const listContacts = () => Contact.find();

export const getContactById = async (contactId) => Contact.findById(contactId);

export const addContact = async (contact) => Contact.create(contact);

export const removeContact = async (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const updateContact = async (contactId, contactData) => {
  const contact = await Contact.findById(contactId);

  Object.keys(contactData).forEach((key) => (contact[key] = contactData[key]));

  return contact.save();
};

export const checkContactId = async (contactId) => {
  const isValidId = Types.ObjectId.isValid(contactId);

  if (!isValidId) {
    throw HttpError(404);
  }

  const isContactExists = await Contact.exists({ _id: contactId });

  if (!isContactExists) {
    throw HttpError(404);
  }
};

export const checkContactExists = async (filter) => {
  const isContactExists = await Contact.exists(filter);

  if (isContactExists) {
    throw HttpError(409);
  }
};

export const checkNecessaryKeysAvailability = (body, keys) => {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  const hasNeccessaryKeys = Object.keys(body).every((element) =>
    keys.includes(element)
  );

  if (!hasNeccessaryKeys) {
    throw HttpError(400, `Only ${keys} field(s) can be updated`);
  }
};
