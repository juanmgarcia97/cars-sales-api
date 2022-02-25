const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

router.get("/", (req, res, next) => {
    sellerController.index(req, res, next);
});

router.get("/:id", (req, res, next) => {
    sellerController.find(req, res, next);
});

router.post("/", (req, res, next) => {
    sellerController.create(req, res, next);
});

router.put("/:id", (req, res, next) => {
    sellerController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    sellerController.delete(req, res, next);
});

module.exports = router;
