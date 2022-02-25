const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", (req, res, next) => {
    clientController.index(req, res, next);
});

router.get("/:id", (req, res, next) => {
    clientController.find(req, res, next);
});

router.post("/", (req, res, next) => {
    clientController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
    clientController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    clientController.delete(req, res, next);
});

module.exports = router;
