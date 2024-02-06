import { Schema, model } from "mongoose";
import { SUBSCRIPTION_TYPE } from "../constants/subscriptionTypes.js";

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: string,
    enum: [...Object.values(SUBSCRIPTION_TYPE)],
    default: SUBSCRIPTION_TYPE.STARTER,
  },
  token: String,
});

export const User = model("User", usersSchema);
