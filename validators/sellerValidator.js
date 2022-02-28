const Joi = require("joi");

const id = Joi.string().alphanum().min(10).max(24).not("-");
const name = Joi.string().min(2).max(30).pattern(/^[A-Za-z]\w+/);
const cc = Joi.string().min(7).max(10).pattern(/^[0-9]+/);
const cellphone = Joi.string().min(3).max(10).pattern(/^[0-9]+/);

const createSellerDTO = Joi.object({
    name: name.required(),
    cc: cc.required(),
    cellphone: cellphone.required(),
});
const updateSellerDTO = Joi.object({
    name: name,
    cc: cc,
    cellphone: cellphone,
});
const getSellerDTO = Joi.object({
    id: id.required(),
});

module.exports = { createSellerDTO, updateSellerDTO, getSellerDTO };
