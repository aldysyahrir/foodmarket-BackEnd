const express = require('express');
const router = express.Router();

//middleware
const createToken = require('../middlewares/createToken');
const verifyToken = require("../middlewares/verifyToken");

//handler
const usersHandler = require("./handler/users");

//router
router.post('/register', usersHandler.register, createToken);
router.post("/login", usersHandler.login, createToken);
router.get("/", verifyToken, usersHandler.get);
router.put("/", verifyToken, usersHandler.profile);
router.put("/address", verifyToken, usersHandler.address);
router.put("/password", verifyToken, usersHandler.password);

module.exports = router;
