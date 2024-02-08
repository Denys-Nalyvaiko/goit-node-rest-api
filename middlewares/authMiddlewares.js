import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";
import * as jwtServices from "../services/jwtServices.js";
import * as userServices from "../services/usersServices.js";

export const protect = catchAsync(async (req, _, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  const id = jwtServices.checkToken(token);

  if (!id) {
    throw HttpError(401);
  }

  await userServices.checkUserId(id);
  const currentUser = await userServices.getUserById(id);

  req.user = currentUser;

  next();
});
