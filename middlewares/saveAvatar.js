const isBase64 = require('is-base64');
const base64img = require('base64-img');
const fs = require('fs');

module.exports = async (req, res, next) => {
    if (!req.body.avatar) next()
    const avatar = req.body.avatar

    if (!isBase64(avatar, { mimeRequired: true })) {
        return res.status(400).json({
            status: "error",
            message: "invalid base64",
        });
    }

    base64img.img(avatar,
        './public/images',
        Date.now(), async (err, filePath) => {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    message: err.message
                });
            }

            const filename = filePath.split('\\').pop().split("/").pop()

            req.user = { image: filename };
            return next();
        }
    );
};