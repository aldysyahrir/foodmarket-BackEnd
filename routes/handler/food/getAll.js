const { Food } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const foods = await Food.findAll();

        if (!foods) {
            return res.status(409).json({
                status: "error",
                key: "GET_FOODS",
                message: "foods not found",
            });
        }
        return res.json({
            status: "success",
            key: "GET_FOODS",
            data: foods
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "GET_FOODS",
            message: error.message,
        });
    }
}