
const path = require("path");
const multer = require("multer");

// @desc    Setup storage engine 
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname +
            "-" + Date.now() +
            path.extname(file.originalname));
    }
});

// @desc    init upload
const upload = multer({
    storage: storage
});

module.exports = upload;