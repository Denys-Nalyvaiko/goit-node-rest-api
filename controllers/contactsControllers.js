import catchAsync from "../helpers/catchAsync.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contactsList = await contactsService.listContacts(req.user, req.query);

  res.status(200).json(contactsList);
});

export const getOneContact = catchAsync(async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id, req.user);

  res.status(200).json(contact);
});

export const createContact = catchAsync(async (req, res) => {
  const contact = await contactsService.addContact(req.body, req.user);

  res.status(201).json(contact);
});

export const updateContact = catchAsync(async (req, res) => {
  const contact = await contactsService.updateContact(
    req.params.id,
    req.body,
    req.user
  );

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id, req.user);

  res.status(200).json(contact);
});
