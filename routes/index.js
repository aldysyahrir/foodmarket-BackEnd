const express = require('express');
const router = express.Router();

//router
const userRouter = require("./users")
const foodRouter = require("./food");
const orderRouter = require("./order");
const paymentRouter = require("./payment");

//midleware
const verifyToken = require("../middlewares/verifyToken");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use("/food", verifyToken, foodRouter);
router.use("/order", verifyToken, orderRouter);
router.use("/payment", paymentRouter);

module.exports = router;
