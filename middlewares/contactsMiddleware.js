import * as contactsService from "../services/contactsServices.js";
import catchAsync from "../helpers/catchAsync.js";

export const checkContactId = catchAsync(async (req, res, next) => {
  await contactsService.checkContactId(req.params.id);
  next();
});
