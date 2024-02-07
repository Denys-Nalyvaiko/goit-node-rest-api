import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

export const registerUser = async (userData) => User.create(userData);

export const loginUser = (userData) => {};

export const logoutUser = () => {};
