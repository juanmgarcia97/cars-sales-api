const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: { type: String, required: true, max: 30 },
  brand: { type: String, required: true, max: 20 },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

// const model =
module.exports = mongoose.model("Car", carSchema);
