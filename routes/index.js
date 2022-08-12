const express = require('express');
const router = express.Router();

const userRouter = require("./users")
const foodRouter = require("./food");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use("/food", foodRouter);

module.exports = router;
