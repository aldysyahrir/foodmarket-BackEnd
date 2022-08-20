const express = require('express');
const router = express.Router();

//middleware
const canAccess = require("../middlewares/permision");

//handler
const foodHandler = require("./handler/food");

//router
router.post("/", canAccess("admin"), foodHandler.create);
router.get("/:id", canAccess("admin", "user"), foodHandler.get);
router.get("/", canAccess("admin", "user"), foodHandler.getAll);
router.delete("/:id", canAccess("admin"), foodHandler.destroy);
router.put("/:id", canAccess("admin"), foodHandler.update);

module.exports = router;