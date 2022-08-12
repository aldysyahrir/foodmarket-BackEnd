const fs = require('fs');

module.exports = (fileName) => {

    const name = fileName.split('/').pop();
    fs.unlink(`./public/images/${name}`, async (err) => {
        if (err) {
            return res.status(400).json({
                status : "error",
                key : "DELETE_AVATAR",
                message : err.message,
            }) 
        }
    });


}