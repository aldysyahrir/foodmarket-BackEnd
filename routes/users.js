const express = require('express');
const router = express.Router();

const saveAvatar = require("../middlewares/saveAvatar");

const usersHandler = require("./handler/users");

router.post('/register', saveAvatar, usersHandler.register);

module.exports = router;
