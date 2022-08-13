const { Order } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const {status} = req.query

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(409).json({
                status: "error",
                key: "UPDATE_ORDER",
                message: "order not found",
            });
        }

        const orderUpdate = await order.update({
            status: status === "1" ? "success" : "canceled",
        });

        return res.json({
            status: "success",
            key: "UPDATE_ORDER",
            message: orderUpdate,
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_ORDER",
            message: error.message,
        });
    }
}