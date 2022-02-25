const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  seller: { type: String, required: true },
  client: { type: String, required: true },
  car: {
    model: { type: String, required: true },
    color: { type: String, required: true },
  },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Sale", saleSchema);
