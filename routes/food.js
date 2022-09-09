const express = require('express');
const router = express.Router();

//middleware
const canAccess = require("../middlewares/permision");
const verifyToken = require('../middlewares/verifyToken');

//handler
const foodHandler = require("./handler/food");

//router
router.post("/", verifyToken, canAccess("admin"), foodHandler.create);
router.get("/:id", foodHandler.get);
router.get("/", foodHandler.getAll);
router.delete("/:id", verifyToken, canAccess("admin"), foodHandler.destroy);
router.put("/:id", verifyToken, canAccess("admin"), foodHandler.update);

module.exports = router;