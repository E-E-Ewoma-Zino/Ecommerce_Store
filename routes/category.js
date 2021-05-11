// ALL ROUTES GOINT TO THE CATEGORY "/CATEGORY" WILL BE IN THIS PAGE
const express = require("express");
const cart = require("../middleware/cart_DBc");
const _get = require("../middleware/get");

// 
const router = express.Router();

// @desc    Get the product detail
// @route   GET /category/:id
router.get("/:id", (req, res) => {

    _get.ProductByID(req.params.id, (err, product) => {
        if (err) {
            console.error(":::::", err);
            res.redirect("/404");
        }
        else {
            res.render("layouts/Single-product", {
                website: _get.Pages().website,
                name: _get.Pages().single.name,
                breadcrumb: _get.Pages().single.breadcrumb,
                cartTotal: cart.total(),
                product: product
            });
        }
    });
});

module.exports = router;