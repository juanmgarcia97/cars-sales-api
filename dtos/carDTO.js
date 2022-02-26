const Joi = require("joi");

const id = Joi.string().alphanum().min(10).max(24).not("-");
const model = Joi.string().alphanum().min(3).max(15);
const brand = Joi.string().alphanum().min(3).max(10);
const price = Joi.string().alphanum().min(3).max(10);
const color = Joi.string()
  .alphanum()
  .min(3)
  .max(15);

const createCarDTO = Joi.object({
  model: model.required(),
  brand: brand.required(),
  price: price.required(),
  color: color.required(),
});
const updateCarDTO = Joi.object({
  model: model,
  brand: brand,
  price: price,
  color: color,
});
const getCarDTO = Joi.object({
  id: id.required(),
});

module.exports = { createCarDTO, updateCarDTO, getCarDTO };
