const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Seller = require('./Seller')
// const Client = require('./Client')
// const Car = require('./Car')

const saleSchema = new Schema({
  saleId: String,
  seller: String,
  client: String,
  car: String,
  date: Date,
});

module.exports = mongoose.model("Sale", saleSchema);
