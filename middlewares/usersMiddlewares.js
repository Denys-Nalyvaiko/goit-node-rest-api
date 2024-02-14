import * as usersServices from "../services/usersServices.js";
import catchAsync from "../helpers/catchAsync.js";
import { ImageService } from "../services/ImageSevice.js";

export const checkUserExists = catchAsync(async (req, _, next) => {
  await usersServices.checkUserExists({ email: req.body.email });
  next();
});

export const saveTemporaryAvatar =
  ImageService.saveOriginalTemporaryFile("avatar");
