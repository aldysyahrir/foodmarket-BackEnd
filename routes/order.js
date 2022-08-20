const express = require("express");
const router = express.Router();

//handler
const orderHandler = require("./handler/order");

//midleware
const payment = require("../middlewares/payment");


router.post("/", orderHandler.create, payment);
router.put("/:id", orderHandler.update);
router.get("/:id", orderHandler.get);
router.get("/", orderHandler.getAll);

module.exports = router