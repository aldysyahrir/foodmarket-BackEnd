const express = require('express');
const router = express.Router();

const userRouter = require("./users")
const foodRouter = require("./food");
const orderRouter = require("./order");
const paymentRouter = require("./payment");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use("/food", foodRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

module.exports = router;
