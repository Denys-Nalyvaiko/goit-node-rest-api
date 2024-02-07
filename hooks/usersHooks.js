import { hash } from "bcrypt";

export async function hashUsersPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hash(this.password, 10);
  next();
}
