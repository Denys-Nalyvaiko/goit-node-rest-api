import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contactsList = await contactsService.listContacts();

  res.status(200).json(contactsList);
};

export const getOneContact = async (req, res) => {
  const contactId = req.params.id;
  const contact = await contactsService.getContactById(contactId);

  try {
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch ({ message }) {
    res.status(404).json({
      message,
    });
  }
};

export const deleteContact = async (req, res) => {
  const contactId = req.params.id;
  const contact = await contactsService.removeContact(contactId);

  try {
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch ({ message }) {
    res.status(404).json({
      message,
    });
  }
};

export const createContact = async (req, res) => {
  const newContact = req.body;
  const contact = await contactsService.addContact(newContact);

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const targetContact = req.body;
  const contactId = req.params.id;

  if (!Object.keys(targetContact).length) {
    res.status(400).json({
      message: "Body must have at least one field",
    });

    return;
  }

  const contact = await contactsService.updateContact(contactId, targetContact);

  try {
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch ({ message }) {
    res.status(404).json({
      message,
    });
  }
};
