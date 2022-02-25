const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  name: { type: String, required: true },
  cc: { type: String, required: true },
  cellphone: { type: String, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);