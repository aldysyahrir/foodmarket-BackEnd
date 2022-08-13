const Validator = require("fastest-validator");
const saveImage = require("../../../utils/saveImage");
const v = new Validator();
const { Food } = require("../../../models");

module.exports = async (req, res) => {


    try {

        const schema = {
            title: "string|empty:false",
            description: "string|empty:false",
            star: "number|empty:false",
            ingredients: "string|empty:false",
            price: "number|empty:false",
            picture: "string|optional",
            popular: "number|optional",
            recommended: "number|optional",
        };
        const validate = v.validate(req.body, schema);

        if (validate.length) {

            return res.status(400).json({
                status: "error",
                key: "CREATE_FOOD",
                message: validate,
            })
        }

        const picture = await saveImage(req.body.picture, res);

        const {
            title,
            description,
            star,
            ingredients,
            price,
            popular,
            recommended } = req.body

        const data = {
            title,
            description,
            star,
            ingredients,
            price,
            popular: popular ?? 0,
            recommended: recommended ?? 0,
            picture
        }

        const foodCreated = await Food.create(data);

        return res.json({
            status: "success",
            key: "CREATE_FOOD",
            data: foodCreated
        })

    } catch (error) {

        return res.status(500).json({
            status: "error",
            key: "CREATE_FOOD",
            message: error.message,
        });
    }
}