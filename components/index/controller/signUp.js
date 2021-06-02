// all the signUp route code goes here

const passport = require("passport");
const Cart = require("../../../model/Cart");
const Users = require("../../../model/Users");
const Orders = require("../../../model/Orders");
const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");
const logger = require("../../../middleware/logger");
const cart = require("../../../middleware/cart_DBc");


module.exports = {
    get(req, res) {
        try {
            res.render("layouts/signup", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
message: messageBird.fly,
                name: `signup`,
                breadcrumb: `Home - signup`,
                msg: ""
            });
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
        try {
            const newCart = new Cart();
            newCart.save();
            const newOrder = new Orders();
            newOrder.save();
    
            // get the data from the cart_LocalStorage
            const cart_LS = req.body.cartData == "null"? []: JSON.parse(req.body.cartData);
            logger.logArg("something", cart_LS);
            logger.logArg("something Again", typeof cart_LS);
    
            const newUser = new Users({
                zip: req.body.zip,
                cart: newCart._id,
                city: req.body.city,
                order: newOrder._id,
                username: req.body.email,
                country: req.body.country,
                company: req.body.company,
                phoneNo: req.body.phoneNo,
                lastname: req.body.lastname,
                address1: req.body.address1,
                address2: req.body.address2,
                firstname: req.body.firstname
            });
    
            Users.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    console.log(":::::::::::::::: " + err);
                    res.render("layouts/signup", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
message: messageBird.fly,
                        name: `signup`,
                        breadcrumb: `Home - signup`,
                        msg: err
                    });
                }
                else {
                    passport.authenticate("local")(req, res, () => {
                        // this part updates the cart with the data from the localStorage
                        for (let i = 0; i < cart_LS.length; i++) {
                            const item = cart_LS[i];
                            logger.logArg2("Logging", item.productID, item.quantity);
                            cart.updateCart(item.productID, item.quantity, req.user._id);
                        }
                        res.redirect("/");
                    });
                }
            });
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
    }
}
