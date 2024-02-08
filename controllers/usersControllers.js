import catchAsync from "../helpers/catchAsync.js";
import * as services from "../services/usersServices.js";

export const registerUserController = catchAsync(async (req, res) => {
  const user = await services.registerUser(req.body);

  res.status(201).json(user);
});

export const loginUserController = catchAsync(async (req, res) => {
  const { user, token } = await services.loginUser(req.body);

  res.status(200).json({ user, token });
});

export const logoutUserController = catchAsync(async (req, res) => {
  const token = await services.logoutUser();

  req.headers.authorization = token;
  req.user = undefined;

  res.sendStatus(204);
});

export const getCurrentController = catchAsync(async (req, res) => {
  res.status(200).json(req.user);
});
