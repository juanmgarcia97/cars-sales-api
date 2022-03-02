const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleId: String,
  seller: [{
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  }],
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Sale", saleSchema);
