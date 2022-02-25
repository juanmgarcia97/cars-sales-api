const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const saleController = require("../controllers/saleController");

router.get("/", (req, res, next) => {
    saleController.index(req, res, next);
});

router.get("/bySeller/:seller", (req, res, next) => {
    saleController.findBySeller(req, res, next);
});

router.get("/byClient/:client", (req, res, next) => {
    saleController.findByClient(req, res, next);
});

router.get("/orderByDate", (req, res, next) => {
    saleController.filterDate(req, res, next);
});

router.post("/", (req, res, next) => {
    saleController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
    saleController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    saleController.delete(req, res, next);
});

module.exports = router;
