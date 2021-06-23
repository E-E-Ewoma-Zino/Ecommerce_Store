// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE

const express = require("express");
const addProduct = require(__dirname + "../../components/admin/controller/addProduct");
const upload = require(__dirname + "../../config/multer");

// This router is for the home / routes
const router = express.Router();


// @desc    AddProduct page
// @route   GET /admin/AddProduct
router.get("/addProduct", (req, res) => addProduct.get(req, res));

// @desc    AddProduct page
// @route   POST admin/addProduct
router.post("/addProduct", upload.array("img"), (req, res) => addProduct.post(req, res));


module.exports = router;