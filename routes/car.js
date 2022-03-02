const express = require("express");
const router = express.Router();
const boom = require("@hapi/boom");
const carService = require("../services/carService");
const validatorHandler = require("../middlewares/validator-handler");
const {
  createCarDTO,
  updateCarDTO,
  getCarDTO,
} = require("../validators/carValidator");

router.get("/", (req, res, next) => {
  carService.index(req, res, next);
});

router.get("/:id", validatorHandler(getCarDTO, "params"), (req, res, next) => {
  carService.find(req, res, next);
});

router.post("/", validatorHandler(createCarDTO, "body"), (req, res, next) => {
  carService.create(req, res, next);
});

router.put(
  "/:id",
  validatorHandler(getCarDTO, "params"),
  validatorHandler(updateCarDTO, "body"),
  (req, res, next) => {
    carService.update(req, res, next);
  }
);

router.delete(
  "/:id",
  validatorHandler(getCarDTO, "params"),
  (req, res, next) => {
    carService.delete(req, res, next);
  }
);

router.all("*", () => {
  throw boom.badRequest("Page was not found");
});

module.exports = router;
