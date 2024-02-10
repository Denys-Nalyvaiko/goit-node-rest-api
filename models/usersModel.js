import { Schema, model } from "mongoose";
import { SUBSCRIPTION_TYPE } from "../constants/subscriptionTypes.js";
import { hashUsersPassword } from "../hooks/usersHooks.js";
import { comparePassword } from "../customMethods/customUserMethods.js";

export const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      select: false,
    },
    subscription: {
      type: String,
      enum: [...Object.values(SUBSCRIPTION_TYPE)],
      default: SUBSCRIPTION_TYPE.STARTER,
    },
    token: String,
  },
  { versionKey: false }
);

usersSchema.pre("save", hashUsersPassword);

usersSchema.methods.comparePassword = comparePassword;

export const User = model("User", usersSchema);
