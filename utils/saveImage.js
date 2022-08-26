const isBase64 = require('is-base64');
const base64img = require('base64-img');

module.exports = async (image, folder, callback) => {
    if (!image) {
        callback(null, "default");
    } else {
        if (!isBase64(image, { mimeRequired: true })) {
            throw new Error("invalid base64");
        }

        base64img.img(image,
            `./public/images/${folder}`,
            Date.now(),
            callback
        );
    }
}

