const Joi = require("joi");

const id = Joi.string().uuid();
const seller = Joi.string().uuid();
const client = Joi.string().uuid();
const car = Joi.string().uuid();
const date = Joi.date();

const createSaleDTO = Joi.object({
  seller: seller.required(),
  client: client.required(),
  car: car.required(),
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
