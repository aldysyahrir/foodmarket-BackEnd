const { Order } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status === "1" ? { status: "waiting" }
            : { status: ["success", "canceled"] }

        const order = await Order.findAll({
            where: query,
        });

        return res.json({
            status: "success",
            key: "GET_ORDER",
            data: order,
        });
    } catch (error) {
        return res.json({
            status: "error",
            key: "GET_ORDER",
            message: error.message,
        });
    }

}