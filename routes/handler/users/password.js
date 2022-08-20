const bcrypt = require('bcrypt')
const Validator = require('fastest-validator')
const { Users } = require("../../../models");

const v = new Validator();

module.exports = async (req, res) => {
    try {
        const { id } = req.user.data;
        const { prev_password, new_password } = req.body;

        const schema = {
            prev_password: "string|min:6",
            new_password: "string|min:6",
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                status: "error",
                key: "UPDATE_PASSWORD",
                message: validate,
            });
        }

        if (prev_password === new_password) {
            return res.status(300).json({
                status: "error",
                key: "UPDATE_PASSWORD",
                message: "previous password cannot be the same as the new password",
            });
        }

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(409).json({
                status: "error",
                key: "UPDATE_PASSWORD",
                message: "user not found",
            });
        }

        const isValidPassword = await bcrypt.compare(prev_password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({
                status: 'error',
                key: 'UPDATE_PASSWORD',
                message: "previous password doesn't match",
            });
        }

        const password = await bcrypt.hash(new_password, 10);

        await user.update({ password });

        return res.json({
            status: "success",
            key: "UPDATE_PASSWORD",
            data: { id: user.id, name: user.name },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "UPDATE_PASSWORD",
            message: error.message,
        });
    }
};