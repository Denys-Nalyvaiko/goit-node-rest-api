import { Types } from "mongoose";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import * as jwtServices from "../services/jwtServices.js";
import { sendEmail } from "./emailServices.js";

export const registerUser = async (userData) => {
  const verificationToken = nanoid();

  const user = await User.create({ ...userData, verificationToken });
  user.password = undefined;

  await sendEmail({
    to: user.email,
    subject: "Confirm your registration",
    text: `verificationToken: ${verificationToken}`,
    html: `<a href=http://localhost:8000/users/verify/${verificationToken} target="_blank">click to verify your account</a>`,
  });

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

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const token = jwtServices.signToken(user.id);
  await User.findByIdAndUpdate(user._id, { token });

  return { user, token };
};

export const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
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

export const verifyUserRegistration = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true }
  );

  if (!user) {
    throw HttpError(404, "User not found");
  }
};

export const resendEmailVerirification = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404);
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail({
    to: user.email,
    subject: "Confirm your registration",
    text: `verificationToken: ${user.verificationToken}`,
    html: `<a href=http://localhost:8000/users/verify/${user.verificationToken} target="_blank">click to verify your account</a>`,
  });
};
