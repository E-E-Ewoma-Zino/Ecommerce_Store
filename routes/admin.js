// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const _ = require("lodash");
const path = require("path");
const multer = require("multer");
const express = require("express");
const _get = require("../middleware/get");
const cart = require("../middleware/cart_DBc");
const Products = require("../model/Products");



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
router.get("/addProduct", (req, res) => {
    try {
        res.render("admin/addProduct", {
        website: _get.Pages().website,
        name: _get.Pages().addProduct.name,
        breadcrumb: _get.Pages().addProduct.breadcrumb,
    });
    } catch (err) {
        console.error(":::", err);
        res.redirect("/500");
    }
    
});



// @desc    AddProduct page
// @route   POST admin/addProduct
router.post("/addProduct", upload.array("img"), (req, res) => {
    // console.log(req.body);

    try {
        // console.log(":::::", req.files);
        const newProduct = new Products({
            name: _.toLower(req.body.name),
            brand: _.toLower(req.body.brand),
            img: req.files,
            color: _.toLower(req.body.color),
            category: _.toLower(req.body.category),
            price: req.body.price,
            description: req.body.description,
            totalNo: req.body.totalNo
        });
    
    
        // console.log("::::::::::", req.body.name);
        newProduct.save((err) => {
            if (err) {
                console.log(":::::", err);
                res.render("admin/addProduct", {
                    website: _get.Pages().website,
                    name: _get.Pages().addProduct.name,
                    breadcrumb: _get.Pages().addProduct.breadcrumb,
                    cartTotal: cart.total(),
                    msg: err
                });
            }
            else{

                console.log("Added new product");
                res.redirect("/admin/addProduct");
            }
        });
    } catch (err) {
        res.render("admin/addProduct", {
            website: _get.Pages().website,
            name: _get.Pages().addProduct.name,
            breadcrumb: _get.Pages().addProduct.breadcrumb,
            cartTotal: cart.total(),
            msg: err
        });
    }
});


module.exports = router;