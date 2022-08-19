const { Order, Food } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status === "1" ? { status: "waiting" }
            : { status: ["success", "canceled"] }

        const foodAttributes = ["title", "price", "picture",]

        const order = await Order.findAll({
            where: query,
            include: [
                { model: Food, as: "food", attributes: foodAttributes },
            ],
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