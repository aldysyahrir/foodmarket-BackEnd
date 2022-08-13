const Validator = require("fastest-validator");
const v = new Validator();

const { Order, Food, Users } = require("../../../models");

module.exports = async (req, res) => {
    try {
        const { food_id, user_id, amount } = req.body

        const schema = {
            food_id: "number|empty:false",
            user_id: "number|empty:false",
            amount: "number|empty:false",
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {

            return res.status(400).json({
                status: "error",
                key: "CREATE_ORDER",
                message: validate,
            });
        }

        const user = await Users.findByPk(user_id);

        if (!user) {
            return res.status(409).json({
                status: "error",
                key: "CREATE_ORDER",
                message: "user not found",
            });
        }

        const food = await Food.findByPk(food_id);

        if (!food) {
            return res.status(409).json({
                status: "error",
                key: "CREATE_ORDER",
                message: "food not found",
            });
        }

        const transactionCode = Math.random().toString(16).substring(2, 8).toUpperCase()


        const data = {
            food_id,
            user_id,
            amount,
            status: "waiting",
            transaction_code: transactionCode,
        }

        console.log('data', data)
        const orderData = await Order.create(data);

        return res.json({
            status: "success",
            key: "CREATE_DATA",
            message: orderData,
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "CREATE_ORDER",
            message: error.message,
        });

    }
}