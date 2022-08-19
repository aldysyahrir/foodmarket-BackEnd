const { Order, Food, Users } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const userAttributes = ["name", "phone", "address", "house_number", "city"]
        const foodAttributes = ["title", "price"]

        const order = await Order.findByPk(id, {
            include: [
                { model: Food, as: "food", attributes: foodAttributes },
                { model: Users, as: "user", attributes: userAttributes },
            ],
        })

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
};