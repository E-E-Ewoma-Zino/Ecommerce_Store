// ALL ROUTES GOINT TO THE CATEGORY "/CATEGORY" WILL BE IN THIS PAGE
const express = require("express");
const cart = require("../middleware/cart_DBc");
const _get = require("../middleware/get");

// 
const router = express.Router();

// @desc    Get the product detail
// @route   GET /category/:id
router.get("/:id", (req, res) => {

    _get.ProductByID(req.params.id, (product) => {
        try{
            res.render("layouts/Single-product", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
            user: req.user,
                name: _get.Pages().single.name,
                breadcrumb: _get.Pages().single.breadcrumb,
                product: product
            });
        }catch(err) {
            console.error(":::::", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                msg: err
            });
        }
    });
});

module.exports = router;