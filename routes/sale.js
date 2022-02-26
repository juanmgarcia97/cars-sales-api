const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const saleController = require("../controllers/saleController");
const validatorHandler = require("../middlewares/validator-handler");
const {
  createSaleDTO,
  updateSaleDTO,
  getSaleDTO,
  getByClientSaleDTO,
  getBySellerSaleDTO,
} = require("../dtos/saleDTO");

router.get("/", (req, res, next) => {
  saleController.index(req, res, next);
});

router.get("/:id", validatorHandler(getSaleDTO, "params"), (req, res, next) => {
  saleController.find(req, res, next);
});

router.get(
  "/bySeller/:seller",
  validatorHandler(getBySellerSaleDTO, "params"),
  (req, res, next) => {
    saleController.findBySeller(req, res, next);
  }
);

router.get(
  "/byClient/:client",
  validatorHandler(getByClientSaleDTO, "params"),
  (req, res, next) => {
    saleController.findByClient(req, res, next);
  }
);

router.get("/orderByDate", (req, res, next) => {
  saleController.filterDate(req, res, next);
});

router.post("/", validatorHandler(createSaleDTO, "body"), (req, res, next) => {
  saleController.create(req, res, next);
});

router.put(
  "/:id",
  validatorHandler(getSaleDTO, "params"),
  validatorHandler(updateSaleDTO, "body"),
  (req, res, next) => {
    saleController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  validatorHandler(getSaleDTO, "params"),
  (req, res, next) => {
    saleController.delete(req, res, next);
  }
);

module.exports = router;
