const express = require("express");
const router = express.Router();
const sellerController = require("../services/sellerService");
const validatorHandler = require("../middlewares/validator-handler");
const {
  createSellerDTO,
  updateSellerDTO,
  getSellerDTO,
} = require("../validators/sellerValidator");
const boom = require("@hapi/boom");

router.get("/", (req, res, next) => {
  sellerController.index(req, res, next);
});

router.get(
  "/:id",
  validatorHandler(getSellerDTO, "params"),
  (req, res, next) => {
    sellerController.find(req, res, next);
  }
);

router.post(
  "/",
  validatorHandler(createSellerDTO, "body"),
  (req, res, next) => {
    sellerController.create(req, res, next);
  }
);

router.put(
  "/:id",
  validatorHandler(getSellerDTO, "params"),
  validatorHandler(updateSellerDTO, "body"),
  (req, res, next) => {
    sellerController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  validatorHandler(getSellerDTO, "params"),
  (req, res, next) => {
    sellerController.delete(req, res, next);
  }
);

router.all("*", () => {
    throw boom.badRequest("Page was not found")
})

module.exports = router;
