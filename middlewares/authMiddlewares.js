import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import { User } from "../models/usersModel.js";

export const protect = catchAsync(async (req, _, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    throw HttpError(401);
  }

  const currentUser = await User.findOne({ token });

  if (!currentUser) {
    throw HttpError(401);
  }

  req.user = currentUser;

  next();
});
