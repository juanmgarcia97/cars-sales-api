const mongoose = require("mongoose")

const url = 'mongodb://localhost:27017/cars-sales'

mongoose.connect(url)

const db = mongoose.connection

db.on("error", console.error.bind(console, "DB failed to connect"))

module.exports = db