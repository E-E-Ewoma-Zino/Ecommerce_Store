// ALL ROUTES GOINT TO THE CATEGORY "/CATEGORY" WILL BE IN THIS PAGE
const express = require("express");
const single_product = require(__dirname + "../../components/cartegory/controller/single_product");

// 
const router = express.Router();

// @desc    Get the product detail
// @route   GET /category/:id
router.get("/:id", (req, res) => single_product(req, res));

module.exports = router;