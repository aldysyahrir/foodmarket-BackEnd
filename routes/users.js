const express = require('express');
const router = express.Router();

//middleware
const saveAvatar = require("../middlewares/saveAvatar");
const createToken = require('../middlewares/createToken');

//handler
const usersHandler = require("./handler/users");

//router
router.post('/register', saveAvatar, usersHandler.register, createToken);
router.post("/login", usersHandler.login, createToken)

module.exports = router;
