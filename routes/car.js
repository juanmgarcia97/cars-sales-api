const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const carController = require("../controllers/carController");

router.get("/", (req, res, next) => {
    carController.index(req, res, next)
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Car.find({ _id: id }, (err, car) => {
    if (err) return next();
    res.send(car);
  });
});

router.post("/", (req, res, next) => {
  carController.create(req, res, next)
});

router.put("/update/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
});

router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
});

module.exports = router;
