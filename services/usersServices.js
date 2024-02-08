import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import * as jwtServices from "../services/jwtServices.js";

export const registerUser = async (userData) => {
  const user = await User.create(userData);
  user.password = undefined;

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isValidPassword = await user.comparePassword(password, user.password);

  if (!isValidPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  user.password = undefined;

  const token = jwtServices.signToken(user.id);

  return { user, token };
};

export const logoutUser = async () => {
  return "";
};

export const getUserById = (userId) => User.findById(userId);

export const getCurrentUser = async (currentUser) => {
  const user = await User.findOne({ _id: currentUser.id }).select("-_id");

  return user;
};

export const checkUserExists = async (filter) => {
  const isUserExists = await User.exists(filter);

  if (isUserExists) {
    throw HttpError(409);
  }
};

export const checkUserId = async (id) => {
  const isValidId = Types.ObjectId.isValid(id);

  if (!isValidId) {
    throw HttpError(404);
  }

  const isUserExists = await User.exists({ _id: id });

  if (!isUserExists) {
    throw HttpError(404);
  }
};

export const updateUser = async (userId, userData) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw HttpError(404);
  }

  Object.keys(userData).forEach((key) => (user[key] = userData[key]));

  return user.save();
};
