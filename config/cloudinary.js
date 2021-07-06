const cloudinary = require("cloudinary").v2;
const logger = require(__dirname + "../../middleware/logger");
const _bird = require(__dirname + "../../middleware/messageBird");

cloudinary.config({
    cloud_name: 'aronoz',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// module.exports = cloudinary;

module.exports = (path, cb) => {
    return new Promise(resolve => {
        resolve(()=> logger.log("resolved"));
        cloudinary.uploader.upload(path, (err, result) => cb(err, result));
    }, reject =>{
        console.log("Rejected", reject);
    });
}
