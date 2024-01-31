import * as contactsService from "../services/contactsServices.js";
import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";

export const checkContactId = catchAsync(async (req, _, next) => {
  await contactsService.checkContactId(req.params.id);
  next();
});

export const checkContactExists = catchAsync(async (req, _, next) => {
  await contactsService.checkContactExists({ email: req.body.email });
  next();
});

export const contactUpdateMiddleware = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  await contactsService.checkContactId(req.params.id);
  next();
});
