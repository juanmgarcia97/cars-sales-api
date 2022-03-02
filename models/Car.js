const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  carId: { type: String },
  model: { type: String },
  brand: { type: String },
  plate: { type: String },
  color: { type: String },
  price: { type: Number },
});

// const model =
module.exports = mongoose.model("Car", carSchema);