const express = require("express")
const routerApi = require("./routes")
const {json} = require("express");

const app = express()
const port = 3000

const db = require("./config/mongoose")

app.use(json());

routerApi(app)

app.listen(port, 'localhost', () => {
  console.log("Server running on localhost:" + port)
})