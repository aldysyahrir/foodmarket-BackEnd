const express = require('express');
const router = express.Router();

//middleware

//handler
const foodHandler = require("./handler/food");

//router
router.post("/", foodHandler.create);
router.get("/:id", foodHandler.get);
router.get("/", foodHandler.getAll);
router.delete("/:id", foodHandler.destroy);
router.put("/:id", foodHandler.update);

module.exports = router