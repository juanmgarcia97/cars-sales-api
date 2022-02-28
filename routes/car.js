const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const validatorHandler = require("../middlewares/validator-handler");
const { createCarDTO, updateCarDTO, getCarDTO } = require("../validators/carValidator");

router.get("/", (req, res, next) => {
  carController.index(req, res, next);
});

router.get("/:id", validatorHandler(getCarDTO, "params"), (req, res, next) => {
  carController.find(req, res, next);
});

router.post("/", validatorHandler(createCarDTO, "body"), (req, res, next) => {
  carController.create(req, res, next);
});

router.put(
  "/:id",
  validatorHandler(getCarDTO, "params"),
  validatorHandler(updateCarDTO, "body"),
  (req, res, next) => {
    carController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  validatorHandler(getCarDTO, "params"),
  (req, res, next) => {
    carController.delete(req, res, next);
  }
);

module.exports = router;
