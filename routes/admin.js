// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const _ = require("lodash")
const express = require("express");
const _get = require("../middleware/get");

// This router is for the home / routes
const router = express.Router();

// @desc    AddProduct page
// @route   GET /admin/AddProduct
router.get("/addProduct", (req, res) => {
    res.render("admin/addProduct", {
        website: _get.Pages().website,
        name: _get.Pages().addProduct.name,
        breadcrumb: _get.Pages().addProduct.breadcrumb
    });
});


// @desc    AddProduct page
// @route   POST admin/addProduct
router.post("/addProduct", (req, res) => {
    console.log(req.body);

    const newProduct = new Products({
        name: _.toLower(req.body.name),
        brand: _.toLower(req.body.brand),
        img: req.body.img,
        color: _.toLower(req.body.color),
        category: _.toLower(req.body.category),
        price: req.body.price,
        description: req.body.description,
        totalNo: req.body.totalNo,
    });

    newProduct.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        console.log("Added new product");
        res.redirect("/addProduct");
    });
});


module.exports = router;