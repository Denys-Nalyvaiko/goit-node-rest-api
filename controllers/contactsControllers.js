import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contactsList = await contactsService.listContacts();

  res.status(200).json({
    message: "Success!",
    contacts: contactsList,
  });
};

export const getOneContact = async (req, res) => {
  const contactId = req.params.id;
  const contact = await contactsService.getContactById(contactId);

  try {
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json({
      message: "Success!",
      contact,
    });
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

    res.status(200).json({
      message: "Success!",
      contact,
    });
  } catch ({ message }) {
    res.status(404).json({
      message,
    });
  }
};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
