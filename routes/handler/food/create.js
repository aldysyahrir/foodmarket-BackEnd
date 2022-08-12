const Validator = require("fastest-validator");
const v = new Validator();
const deleteAvatar = require("../../../utils/deleteAvatar")

module.exports = async (req, res) => {
    const image = req.user?.image ?? ""
    const picture = `${req.get("host")}/image/${image}`;

    try {

        const schema = {
            title: "string|empty:false",
            description: "string|empty:false",
            star: "number|empty:false",
            ingredients: "string|empty:false",
            price: "number|empty:false",
            picture: "string",
            popular: "number",
            recommended: "number",
        };
        const validate = v.validate(req.body, schema);

        if (validate.length) {
            deleteAvatar(picture, res);
            return res.status(400).json({
                status: "error",
                key: "CREATE_FOOD",
                message: validate,
            })
        }

        return res.send("ok")
    } catch (error) {
        deleteAvatar(picture, res);
        return res.status(500).json({
            status: "error",
            key: "CREATE_FOOD",
            message: error.message,
        });
    }
}