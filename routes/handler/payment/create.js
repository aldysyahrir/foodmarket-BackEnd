const { Order, Payment } = require("../../../models");

module.exports = async (req, res) => {
    try {
        console.log('req.body', req.body);

        const { signature_key,
            order_id,
            status_code,
            gross_amount,
            transaction_status,
            fraud_status,
            payment_type } = req.body;

        const orderId = order_id.split("_")[0];

        const order = await Order.findByPk(orderId);

        //validasi signature key

        if (!order) {
            return res.status(404).json({
                status: "error",
                key: "CREATE_PAYMENT",
                message: "order not found",
            });
        };

        if (order.status === "success") {
            return res.status(405).json({
                status: "error",
                key: "CREATE_PAYMENT",
                message: "opration not permitted",
            });
        };

        let orderStatus = "waiting";

        if (transaction_status == 'capture') {
            if (fraud_status == 'challenge') {
                orderStatus = "waiting"

            } else if (fraud_status == 'accept') {
                orderStatus = "success"
            }
        } else if (transaction_status == 'settlement') {
            orderStatus = "waiting"

        } else if (transaction_status == 'cancel' ||
            transaction_status == 'deny' ||
            transaction_status == 'expire') {
            orderStatus = "canceled"

        } else if (transaction_status == 'pending') {
            orderStatus = "waiting"
        };

        const logData = {
            status: transaction_status,
            raw_response: JSON.stringify({
                signature_key,
                order_id,
                status_code,
                gross_amount,
                transaction_status,
                fraud_status,
                payment_type
            }),
            order_id: Number(orderId),
            payment_type,
        };

        Payment.create(logData);
        order.update({
            status: orderStatus
        });

        return res.send("ok");
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "CREATE_PAYMENT",
            error: error.message,
        });
    }
};