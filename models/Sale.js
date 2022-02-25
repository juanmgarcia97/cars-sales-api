const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  seller: { type: String, required: true },
  client: { type: String, required: true },
  car: { type: String, required: true },
  date: { type: Date },
});

module.exports = mongoose.model("Sale", saleSchema);
