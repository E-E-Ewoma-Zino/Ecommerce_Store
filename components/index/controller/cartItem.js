// all the cartItem route code goes here
const _get = require("../../../middleware/get");
const cart = require("../../../middleware/cart_DBc");
const messageBird = require("../../../middleware/messageBird");


module.exports = {
    get(req, res) {
        // when a product is added to cart, we will get the 
        // USER, PRODUCT and ORDER
        // first User with _get.CurrentUser()
        // second product:

        try {
            if (req.isAuthenticated()) cart.userCart(req.user._id, (item) => {
                res.send(item);
            });
            else res.send("No user loged in");
        } catch (err) {
            console.error(":::", err);
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
        // when a product is added to cart, we will get the 
        // USER, PRODUCT and ORDER
        // first User with _get.CurrentUser()
        // second product:

        try {
            // const productID = req.body.data.productID;
            // this is the total no of products that was ordered for
            // const quantity = req.body.data.quantity;
            console.log(req.body);
            if (req.isAuthenticated()) {
                cart.updateCart(req.body.productID, req.body.quantity, req.user._id);
                res.redirect("/");
            }
            else {
                // console.log(req.body);
                let arr = [];
                // if the postCartData from the cart_control sends an empty array do:
                if (req.body.length == 0 || undefined || null) res.send([]);
                for (let i = 0; i < req.body.length; i++) {
                    const productId = req.body[i].productID;
                    _get.ProductByID(productId, (result) => {
                        // console.log(result);
                        arr.push(result);
                        if (i == req.body.length - 1) res.send(arr);
                    });
                }
            }
        } catch (err) {
            console.error(":::", err);
            res.render("layouts/500", {
                user: req.user,
                message: messageBird.fly,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                login: req.isAuthenticated(),
                website: _get.Pages().website,
                name: `500 - Internal server error!`,
                msg: err
            });
        }
    }
}
