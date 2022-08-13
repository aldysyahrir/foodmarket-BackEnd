const { Food } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const foods = await Food.findByPk(id);

        if (!foods) {
            return res.status(409).json({
                status: "error",
                key: "DESTROY_FOOD",
                message: "food not found",
            });
        }

        await Food.destroy({
            where: { id },
        });

        return res.json({
            status: "success",
            key: "DESTROY_FOOD",
            data: foods
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "DESTROY_FOOD",
            message: error.message,
        });
    }
}