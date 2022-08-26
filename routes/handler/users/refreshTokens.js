const { RefreshToken } = require("../../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_REFRESH_TOKEN, JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

module.exports = async (req, res) => {
    try {
        const { refresh_token, email } = req.body;

        if (!refresh_token | !email) {
            res.status(400).json({
                status: "error",
                key: "REFRESH_TOKEN",
                message: "invalid token",
            });
        }

        const token = await RefreshToken.findOne({
            where: { refresh_token },
        });

        if (!token) {
            res.status(400).json({
                status: "error",
                key: "REFRESH_TOKEN",
                message: "invalid token",
            });
        };

        jwt.verify(token.refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: "error",
                    key: "REFRESH_TOKEN",
                    message: err.message,
                });
            }

            if (email !== decoded.data.email) {
                res.status(400).json({
                    status: "error",
                    key: "REFRESH_TOKEN",
                    message: "email is not valid",
                });
            }

            const newToken = jwt.sign({ data: decoded.data }, JWT_SECRET, {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
            });

            res.json({
                status: "success",
                key: "REFRESH_TOKEN",
                data: {
                    token: newToken,
                    refresh_token,
                },
            });

        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            key: "REFRESH_TOKEN",
            message: error.message,
        });
    }
};