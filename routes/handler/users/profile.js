const { Users } = require("../../../models");
const saveImage = require("../../../utils/saveImage")
const fs = require("fs")

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

        if (!avatar) {
            await user.update({ name });

            return res.json({
                status: "success",
                key: "UPDATE_PROFILE",
                data: user
            });
        } else {
            if (user.avatar !== "default") {
                const previusAvatar = `./public/images/users/${user.avatar.split("/").pop()}`
                fs.unlink(previusAvatar, async (err) => {
                    if (err) {
                        return res.status(400).json({
                            status: "error", message: err.message
                        })
                    }
                    saveImage(avatar, "users", async (error, filePath) => {
                        if (error) {
                            return res.status(400).json({
                                status: "error",
                                key: "UPDATE_PROFILE",
                                message: error.message,
                            });
                        }
                        const newFilePath = filePath.split("\\").pop().split("/").pop()
                        const newAvatar = `${req.get("host")}/images/users/${newFilePath}`

                        await user.update({ name, avatar: newAvatar });
                        return res.json({
                            status: "success",
                            key: "UPDATE_PROFILE",
                            data: user,
                        });
                    });
                });
            } else {
                saveImage(avatar, "users", async (error, filePath) => {
                    if (error) {
                        return res.status(400).json({
                            status: "error",
                            key: "UPDATE_PROFILE",
                            message: error.message,
                        });
                    }
                    const newFilePath = filePath.split("\\").pop().split("/").pop()
                    const newAvatar = `${req.get("host")}/images/users/${newFilePath}`

                    await user.update({ name, avatar: newAvatar });
                    return res.json({
                        status: "success",
                        key: "UPDATE_PROFILE",
                        data: user,
                    });
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_PROFILE",
            message: error.message,
        });
    }
};