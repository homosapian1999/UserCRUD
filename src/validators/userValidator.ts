import Joi from "joi";
import { Interests } from "../models/User";

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email should be a valid email",
    "string.empty": "Email is required",
  }),
  age: Joi.number().optional().messages({
    "number.base": "Age should be a number",
  }),
  mobile: Joi.string().length(10).pattern(/^\d+$/).required().messages({
    "string.length": "Mobile should be exactly 10 digits",
    "string.pattern.base": "Mobile should only contain digits",
    "any.required": "Mobile is required",
  }),
  interests: Joi.array()
    .items(Joi.string().valid(...Object.values(Interests)))
    .messages({
      "array.base": "Interests should be an array",
      "any.only": "Interests should be valid values",
    })
    .optional(),
});
