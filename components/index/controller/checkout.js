// all the checkout route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const Orders = require(__dirname + "../../../../model/Orders");
const cart = require(__dirname + "../../../../middleware/cart_DB");
const logger = require(__dirname + "../../../../middleware/logger");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = {
    get(req, res) {

        try {
            if (req.isAuthenticated()) cart.userCart(req.user._id, (cart) => {
                res.render("layouts/checkout", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    bird: _bird.fly,
                    name: _get.Pages().checkout.name,
                    breadcrumb: _get.Pages().checkout.breadcrumb,
                    cart: cart
                });
            });
            else {
                _bird.message("warning", "Please LogIn!");
                res.render("layouts/checkout", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    bird: _bird.fly,
                    name: _get.Pages().checkout.name,
                    breadcrumb: _get.Pages().checkout.breadcrumb,
                    cart: { item: [] }
                });
            }


        } catch (err) {
            console.error(":::", err);

            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),

            });
        }
    },
    post(req, res) {
        // This is where an order will be created
        // Steps to create an order
        // 1. Get the order
        // 2. Save the order
        // 3. Done😁

        logger.logArg("Order >", req.body);
        const details = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            company: req.body.company,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            country: req.body.country,
            city: req.body.city,
            address1: req.body.address1,
            zip: req.body.zip,
            note: req.body.note,
        };

        cart.userCart(req.user._id, (cart) => {

            const newOrder = new Orders({
                user: req.user._id,
                cart: cart.item,
                total: req.body.total,
                details: details,
                shipping: req.body.shipping,
                subtotal: req.body.subtotal,
                orderMethod: req.body.orderMethod
            });

            newOrder.save((err) => {

                if (err) {
                    _bird.message("danger", "Sorry, could not create order");
                }
                else {
                    _bird.message("success", "Successfully created an order");
                }
            });
        });
        res.send("Order Delivered Successfully");
    }
}