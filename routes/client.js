const express = require("express");
const router = express.Router();
const clientController = require("../services/clientService");
const validatorHandler = require("../middlewares/validator-handler");
const {
  createClientDTO,
  updateClientDTO,
  getClientDTO,
} = require("../validators/clientValidator");
const boom = require("@hapi/boom");

router.get("/", (req, res, next) => {
  clientController.index(req, res, next);
});

router.get(
  "/:id",
  validatorHandler(getClientDTO, "params"),
  (req, res, next) => {
    clientController.find(req, res, next);
  }
);

router.post(
  "/",
  validatorHandler(createClientDTO, "body"),
  (req, res, next) => {
    clientController.create(req, res, next);
  }
);

router.put(
  "/:id",
  validatorHandler(getClientDTO, "params"),
  validatorHandler(updateClientDTO, "body"),
  (req, res, next) => {
    clientController.update(req, res, next);
  }
);

router.delete(
  "/:id",
  validatorHandler(getClientDTO, "params"),
  (req, res, next) => {
    clientController.delete(req, res, next);
  }
);

router.all("*", () => {
    throw boom.badRequest("Page was not found")
})

module.exports = router;
