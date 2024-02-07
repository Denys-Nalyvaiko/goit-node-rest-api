import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

export const registerUser = async (userData) => {
  const user = await User.create(userData);
  user.password = undefined;

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw HttpError(401);
  }

  const isValidPassword = await user.comparePassword(password, user.password);

  if (!isValidPassword) {
    throw HttpError(401);
  }

  user.password = undefined;

  return user;
};

export const logoutUser = () => {};

export const checkUserExists = async (filter) => {
  const isUserExists = await User.exists(filter);

  if (isUserExists) {
    throw HttpError(409);
  }
};
