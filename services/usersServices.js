import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

export const registerUser = async (userData) => {
  const user = await User.create(userData);
  user.password = undefined;

  return user;
};

export const loginUser = (userData) => {};

export const logoutUser = () => {};
