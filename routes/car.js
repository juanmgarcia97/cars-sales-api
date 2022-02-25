const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", (req, res, next) => {
  carController.index(req, res, next);
});

router.get("/:id", (req, res, next) => {
  carController.find(req, res, next);
});

router.post("/", (req, res, next) => {
  carController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
  carController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
  carController.delete(req, res, next);
});

module.exports = router;
