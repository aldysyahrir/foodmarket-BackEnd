const express = require("express");
const router = express.Router();

//handler
const orderHandler = require("./handler/order");

router.post("/", orderHandler.create);
router.put("/:id", orderHandler.update);
router.get("/", orderHandler.getAll);

module.exports = router