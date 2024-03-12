import Joi from "joi";

export const id_required = Joi.string().min(24).max(24).required();

export const create_book = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const update_book = Joi.object({
  id: id_required,
  name: Joi.string(),
  author: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
});
