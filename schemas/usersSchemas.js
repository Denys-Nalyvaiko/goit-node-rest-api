import Joi from "joi";
import { SUBSCRIPTION_TYPE } from "../constants/subscriptionTypes.js";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": "Missing required email field" }),
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
  }),
});

export const updateSubscriptionUserTypeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(SUBSCRIPTION_TYPE))
    .default(SUBSCRIPTION_TYPE.STARTER)
    .messages({ "any.required": "Invalid subscription type" }),
});

export const resendUserVerificationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": "Missing required email field" }),
});
