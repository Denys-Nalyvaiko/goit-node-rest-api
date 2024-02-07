import dotenv from "dotenv";
import { hash } from "bcrypt";
import { DEFAULT_SALT_ROUNDS } from "../constants/defaultSaltRounds.js";

dotenv.config();

const { SALT_ROUNDS } = process.env;

export async function hashUsersPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hash(
    this.password,
    Number(SALT_ROUNDS) ?? DEFAULT_SALT_ROUNDS
  );
  next();
}
