const { Users } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { id } = req.user.data;
        const { phone, address, house_number, city } = req.body;

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
            return res.status(409).json({
                status: "error",
                key: "UPDATE_ADDRESS",
                message: "user not found",
            });
        }

        await user.update({ phone, address, house_number, city });

        return res.json({
            status: "success",
            key: "UPDATE_ADDRESS",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_ADDRESS",
            message: error.message,
        });
    }
};