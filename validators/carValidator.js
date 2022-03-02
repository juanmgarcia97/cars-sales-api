const Joi = require("joi");

const id = Joi.string().uuid();
const model = Joi.string().min(3).max(15).pattern(/^[A-Za-z]\w+/);
const brand = Joi.string().alphanum().min(3).max(10);
const plate = Joi.string().pattern(/^[A-Z0-9]{6}/);
const price = Joi.number().min(1).max(1000000000);
const color = Joi.string()
  .alphanum()
  .min(3)
  .max(15);

const createCarDTO = Joi.object({
  carId: id,
  model: model.required(),
  brand: brand.required(),
  plate: plate.required(),
  price: price.required(),
  color: color.required(),
});
const updateCarDTO = Joi.object({
  carId: id,
  model: model,
  brand: brand,
  plate: plate,
  price: price,
  color: color,
});
const getCarDTO = Joi.object({
  id: id.required(),
});

module.exports = { createCarDTO, updateCarDTO, getCarDTO };
