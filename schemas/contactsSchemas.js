import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone field" }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({ "any.required": "Field name is not correct" }),
  email: Joi.string().messages({
    "any.required": "Field email is not correct",
  }),
  phone: Joi.string().messages({
    "any.required": "Field phone is not correct",
  }),
});
