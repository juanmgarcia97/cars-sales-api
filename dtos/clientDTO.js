const Joi = require("joi");

const id = Joi.string().alphanum().min(10).max(24).not("-");
const name = Joi.string().min(2).max(30).pattern(/^[A-Za-z]+$/);
const cc = Joi.string().min(7).max(10).pattern(/^d\$/);
const cellphone = Joi.string().min(3).max(10).pattern(/^d\$/);

const createClientDTO = Joi.object({
    name: name.required(),
    cc: cc.required(),
    cellphone: cellphone.required(),
});
const updateClientDTO = Joi.object({
    name: name,
    cc: cc,
    cellphone: cellphone,
});
const getClientDTO = Joi.object({
    id: id.required(),
});

module.exports = { createClientDTO, updateClientDTO, getClientDTO };
