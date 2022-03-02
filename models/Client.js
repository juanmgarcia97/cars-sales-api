const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientId: String,
  firstname: String,
  lastname: String,
  cc: String,
  cellphone: String,
});

module.exports = mongoose.model("Client", clientSchema);
