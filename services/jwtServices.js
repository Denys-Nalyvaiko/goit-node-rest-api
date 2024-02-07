import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../helpers/HttpError.js";
import { DEFAULT_EXPIRED_TIME } from "../constants/defaultExpiredTime.js";

dotenv.config();

const { SECRET_KEY, EXPIRED_TIME } = process.env;

export const signToken = (id) =>
  jwt.sign({ data: id }, SECRET_KEY, {
    expiresIn: EXPIRED_TIME ?? DEFAULT_EXPIRED_TIME,
  });

export const checkToken = (token) => {
  if (!token) {
    throw HttpError(401);
  }

  try {
    const { data } = jwt.verify(token, SECRET_KEY);
    return data;
  } catch {
    throw HttpError(401);
  }
};
