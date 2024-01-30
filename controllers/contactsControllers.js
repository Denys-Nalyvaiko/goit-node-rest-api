import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contactsList = await contactsService.listContacts();

  res.status(200).json(contactsList);
});

export const getOneContact = catchAsync(async (req, res) => {
  const contactId = req.params.id;

  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const contactId = req.params.id;

  const contact = await contactsService.removeContact(contactId);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = req.body;

  const contact = await contactsService.addContact(newContact);

  res.status(201).json(contact);
});

export const updateContact = catchAsync(async (req, res) => {
  const targetContact = req.body;
  const contactId = req.params.id;

  if (!Object.keys(targetContact).length) {
    res.status(400).json({
      message: "Body must have at least one field",
    });

    return;
  }

  const contact = await contactsService.updateContact(contactId, targetContact);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
});
