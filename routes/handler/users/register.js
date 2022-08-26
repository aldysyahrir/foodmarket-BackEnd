const bcrypt = require('bcrypt')
const Validator = require('fastest-validator')
const { Users } = require("../../../models");

const v = new Validator();
const saveImage = require("../../../utils/saveImage");

module.exports = async (req, res, next) => {

    try {

        const schema = {
            name: "string|empty:false",
            email: "email|empty:false",
            password: "string|min:6",
            phone: "number|empty:false",
            password: "string|min:6",
            address: "string|empty:false",
            house_number: "string|empty:false",
            address: "string|empty:false",
            city: "string|empty:false",
            avatar: "string|optional",
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({
                status: "error",
                key: "REGISTER",
                message: validate,
            })
        }

        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (user) {
            return res.status(400).json({
                status: "error",
                key: "REGISTER",
                message: "email already exist",
            })
        }

        const password = await bcrypt.hash(req.body.password, 10)
        const { name, email, phone, address, house_number, city } = req.body;
        await saveImage(req.body.avatar, "users", async (err, filePath) => {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    message: err.message
                });
            }

            let avatar = "default";
            if (filePath !== "default") {

                const newFilePath = filePath.split('\\').pop().split("/").pop();
                avatar = `${req.get("host")}/images/users/${newFilePath}`;
            }

            const data = {
                name,
                email,
                password,
                phone,
                address,
                house_number,
                city,
                avatar,
                rules: req.body.rules ?? "user"
            };

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

            const createUsers = await Users.create(data);

            req.user = { data: createUsers.dataValues }
            return next()
        });

    } catch (error) {
        return res.json({
            status: "error",
            message: error.message,
            key: "REGISTER",
        });
    }
};