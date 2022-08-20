const express = require("express");
const router = express.Router();

// handler
const paymentHandler = require("./handler/payment");

router.post("/", paymentHandler.create);

module.exports = router;
