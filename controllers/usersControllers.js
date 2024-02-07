import catchAsync from "../helpers/catchAsync.js";
import * as services from "../services/usersServices.js";

export const registerUserController = catchAsync(async (req, res) => {
  const user = await services.registerUser(req.body);

  res.status(201).json(user);
});

export const loginUserController = catchAsync(async (req, res) => {});

export const logoutUserController = catchAsync(async (req, res) => {});
