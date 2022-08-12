const express = require('express');
const router = express.Router();

//middleware
const saveAvatar = require("../middlewares/saveAvatar");

//handler
const foodHandler = require("./handler/food");

//router
router.post("/", saveAvatar, foodHandler.create);

module.exports = router