import Joi from "joi";

export const verify_login = Joi.object({
  user_id: Joi.string().required(),
  password: Joi.string().required(),
});
