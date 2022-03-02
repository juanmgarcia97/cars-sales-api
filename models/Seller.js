const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  sellerId: String,
  firstname: String,
  lastname: String,
  cc: String,
  cellphone: String,
});

module.exports = mongoose.model("Seller", sellerSchema);
