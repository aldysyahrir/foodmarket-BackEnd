const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models");
const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;


module.exports = async (req, res) => {

    try {
        const { data } = req.user

        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
        const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        await RefreshToken.create({
            refresh_token: refreshToken,
            email: data.email,
            user_id: data.id,
        });

        return res.json({
            status: 'success',
            key: 'TOKEN',
            data: {
                token,
                refresh_token: refreshToken,
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            key: 'TOKEN',
            message: error.message,
        });
    }
};