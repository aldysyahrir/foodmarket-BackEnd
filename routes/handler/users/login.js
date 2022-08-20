const bcrypt = require('bcrypt')
const Validator = require('fastest-validator')
const { Users } = require("../../../models");

const v = new Validator();

module.exports = async (req, res, next) => {
    try {
        const schema = {
            email: 'email|empty:false',
            password: "string|min:6",
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                key: 'LOGIN',
                message: validate,
            });
        }

        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(400).json({
                status: 'error',
                key: 'LOGIN',
                message: 'user not found',
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password,
            user.password)
        if (!isValidPassword) {
            return res.status(404).json({
                status: 'error',
                key: 'LOGIN',
                message: 'invalid password',
            });
        }

        req.user = { data: user.dataValues };

        return next()

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            key: 'LOGIN',
            message: error.message,
        });
    }
}