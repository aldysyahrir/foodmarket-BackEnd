const { Users } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { id } = req.user.data;
        const { name, avatar } = req.body;

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
                key: "UPDATE_PROFILE",
                message: "user not found",
            });
        }

        await user.update({ name, avatar });

        return res.json({
            status: "success",
            key: "UPDATE_PROFILE",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_PROFILE",
            message: error.message,
        });
    }
};