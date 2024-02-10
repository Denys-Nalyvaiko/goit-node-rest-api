import { compare } from "bcrypt";

export const comparePassword = (candidate, passwordHash) =>
  compare(candidate, passwordHash);
