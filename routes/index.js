const express = require("express");
const carRouter = require("./car");
const sellerRouter = require("./seller");
const clientRouter = require("./client");
const saleRouter = require("./sale");
const boom = require("@hapi/boom");

function routerApi(app) {
    const router = express.Router();
    app.use("/api", router);
    router.use("/cars", carRouter);
    router.use("/sellers", sellerRouter);
    router.use("/clients", clientRouter);
    router.use("/sales", saleRouter);
    router.all("*", () => {
        throw boom.badRequest("Page was not found")
    })
}

module.exports = routerApi;