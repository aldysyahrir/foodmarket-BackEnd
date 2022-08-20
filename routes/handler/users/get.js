const { Users } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { id } = req.user.data;

        const attributes = [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "house_number",
            "city",
            "avatar",
            "rules",
        ];

        const user = await Users.findByPk(id, { attributes });

        if (!user) {
            return res.status(404).json({
                status: "error",
                key: "GET_USER",
                message: "user not found",
            });
        }

        return res.json({
            status: "success",
            key: "GET_USER",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "GET_USER",
            message: error.message,
        });
    }
};