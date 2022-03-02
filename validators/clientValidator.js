const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(30).pattern(/^[A-Za-z]\w+/);
const cc = Joi.string().min(7).max(10).pattern(/^[0-9]+/);
const cellphone = Joi.string().min(3).max(10).pattern(/^[0-9]+/);

const createClientDTO = Joi.object({
    firstname: name.required(),
    lastname: name.required(),
    cc: cc.required(),
    cellphone: cellphone.required(),
});
const updateClientDTO = Joi.object({
    firstname: name,
    lastname: name,
    cc: cc,
    cellphone: cellphone,
});
const getClientDTO = Joi.object({
    id: id.required(),
});

module.exports = { createClientDTO, updateClientDTO, getClientDTO };
