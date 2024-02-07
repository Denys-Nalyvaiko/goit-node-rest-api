import { Schema, model } from "mongoose";
import { SUBSCRIPTION_TYPE } from "../constants/subscriptionTypes.js";

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
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

export const User = model("User", usersSchema);
