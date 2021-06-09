// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const path = require("path");
const multer = require("multer");
const express = require("express");
const addProduct = require(__dirname + "../../components/admin/controller/addProduct");

// This router is for the home / routes
const router = express.Router();

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


// @desc    AddProduct page
// @route   GET /admin/AddProduct
router.get("/addProduct", (req, res) => addProduct.get(req, res));

// @desc    AddProduct page
// @route   POST admin/addProduct
router.post("/addProduct", upload.array("img"), (req, res) => addProduct.post(req, res));


module.exports = router;