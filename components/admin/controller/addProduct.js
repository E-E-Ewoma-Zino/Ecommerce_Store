// all the admin/addProduct code goes here
const _ = require("lodash");

const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");
const cart = require("../../../middleware/cart_DBc");
const Products = require("../../../model/Products");

module.exports = {
    get(req, res) {

        try {
            res.render("admin/addProduct", {
                website: _get.Pages().website,
                name: _get.Pages().addProduct.name,
                breadcrumb: _get.Pages().addProduct.breadcrumb,
                login: req.isAuthenticated(),
                user: req.user
            });
        } catch (err) {
            console.error(":::::", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
message: messageBird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                msg: err
            });
        }
    },
    post(req, res) {
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
                        login: req.isAuthenticated(),
                        user: req.user,
message: messageBird.fly,
                        name: _get.Pages().addProduct.name,
                        breadcrumb: _get.Pages().addProduct.breadcrumb,
                        cartTotal: cart.total(),
                        msg: err
                    });
                }
                else {
                    console.log("Added new product");
                    res.redirect("/admin/addProduct");
                }
            });
        } catch (err) {
            res.render("admin/addProduct", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
message: messageBird.fly,
                name: _get.Pages().addProduct.name,
                breadcrumb: _get.Pages().addProduct.breadcrumb,
                cartTotal: cart.total(),
                msg: err
            });
        }
    }
}