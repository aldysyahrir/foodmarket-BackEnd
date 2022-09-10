const midtransClient = require("midtrans-client");
const { MIDTRANS_SERVER_KEY, MIDTRANS_PRODUCTION } = process.env;

const snap = new midtransClient.Snap({
    isProduction: MIDTRANS_PRODUCTION === "true" ? true : false,
    serverKey: MIDTRANS_SERVER_KEY,
});

module.exports = async (req, res) => {
    try {
        const { order, user, food } = req.user;

        const totalPrice = food.price * order.amount;
        const tax = (totalPrice * 10) / 100;
        const driver = 50000;
        const grossAmount = totalPrice + tax + driver;

        const parameter = {
            transaction_details: {
                order_id: `${order.id}_${order.transaction_code}`,
                gross_amount: grossAmount,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: user.name,
                email: user.email,
            },
        };

        const transaction = await snap.createTransaction(parameter)

        return res.json({
            status: "success",
            key: "PAYMENT",
            data: { ...order.dataValues, ...transaction }
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "PAYMENT",
            message: error.message
        })
    }
}