const { Food } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const food = await Food.findByPk(id);

        if (!food) {
            return res.status(409).json({
                status: "error",
                key: "UPDATE_FOOD",
                message: "food not found",
            });
        }

        const {
            title,
            description,
            star,
            ingredients,
            price,
            popular,
            recommended,
            picture }
            = req.body

        const data = {
            title,
            description,
            star,
            ingredients,
            price,
            popular,
            recommended,
            picture
        }

        const foodUpdate = await food.update(data);

        return res.json({
            status: "success",
            key: "UPDATE_FOOD",
            data: foodUpdate
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_FOOD",
            message: error.message,
        });
    }
}