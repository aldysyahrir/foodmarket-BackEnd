const isBase64 = require('is-base64');
const base64img = require('base64-img');

module.exports = (image, res) => {
    let filename = "default";
    if (!image) return filename

    if (!isBase64(image, { mimeRequired: true })) {
        return res.status(400).json({
            status: "error",
            message: "invalid base64",
        });
    }

    filename = base64img.img(image,
        './public/images',
        Date.now(), async (err, filePath) => {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    message: err.message
                });
            }

            return filePath.split('\\').pop().split("/").pop()

        }
    );
    return filename;

}

