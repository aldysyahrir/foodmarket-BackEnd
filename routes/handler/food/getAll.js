const { Food } = require("../../../models");

module.exports = async (req, res) => {
    try {

        const { key } = req.query

        let query = {};

        // ASC ( ascending ) mengurutkan dari kecil ke besar
        // DESC ( descending ) mengurutkan dari besar ke kecil

        if (key === "banner") {
            query = {
                order: [['star', 'DESC']]
            }
        }

        else if (key === "popular") {
            query = {
                order: [['popular', 'DESC']]
            }
        }

        else if (key === "recommended") {
            query = {
                order: [['recommended', 'DESC']]
            }
        }

        const foods = await Food.findAll(query);

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