import Joi from "joi";

export const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
