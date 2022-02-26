const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const validatorHandler = require("../middlewares/validator-handler");
const {
  createClientDTO,
  updateClientDTO,
  getClientDTO,
} = require("../dtos/clientDTO");

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

module.exports = router;
