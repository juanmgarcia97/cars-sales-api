const Joi = require("joi");

const id = Joi.string().alphanum().min(10).max(24).not("-");
const seller = Joi.string()
  .min(2)
  .max(30)
  .pattern(/^[A-Za-z]\w+/);
const client = Joi.string()
  .min(2)
  .max(30)
  .pattern(/^[A-Za-z]\w+/);
const car = Joi.string()
  .min(3)
  .max(15)
  .pattern(/^[A-Za-z]\w+/);
const date = Joi.date();

const createSaleDTO = Joi.object({
  seller: seller.required(),
  client: client.required(),
  car: car.required(),
  date: date.required(),
});

const updateSaleDTO = Joi.object({
  seller: seller,
  client: client,
  car: car,
  date: date,
});

const getSaleDTO = Joi.object({
  id: id.required(),
});

const getByClientSaleDTO = Joi.object({
  client: client.required(),
});

const getBySellerSaleDTO = Joi.object({
  seller: seller.required(),
});

module.exports = {
  createSaleDTO,
  updateSaleDTO,
  getSaleDTO,
  getByClientSaleDTO,
  getBySellerSaleDTO,
};
