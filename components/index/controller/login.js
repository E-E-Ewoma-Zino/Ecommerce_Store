// all the logIn route code goes here
const passport = require("passport");
const Users = require("../../../model/Users");
const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");
const logger = require("../../../middleware/logger");
const cart = require("../../../middleware/cart_DBc");



module.exports = {
    get(req, res) {
        try {
            messageBird.message("success", "Entered LogIn");
            logger.logArg("mnbv", messageBird.fly);

            res.render("layouts/login", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                message: messageBird.fly,
                name: `LogIn`,
                breadcrumb: `Home - Login`,
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
    post(req, res, next) {
        try {
            // get the data from the cart_LocalStorage
            const cart_LS = req.body.cartData == "null" ? [] : JSON.parse(req.body.cartData);
            logger.logArg("something", cart_LS);
            logger.logArg("something Again", typeof cart_LS);

            const user = new Users({
                username: req.body.email,
                password: req.body.password
            });
            req.logIn(user, (err) => {
                if (err) {
                    console.log("::::::::::::: " + err);
                    res.render("layouts/login", {
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
                    passport.authenticate('local', function (err, user, info) {
                        if (err) {
                            req.logOut();
                            return res.render("layouts/login", {
                                website: _get.Pages().website,
                                login: req.isAuthenticated(),
                                user: req.user,
                                message: messageBird.fly,
                                name: `signup`,
                                breadcrumb: `Home - signup`,
                                msg: err
                            });
                        }
                        if (!user) {
                            req.logOut();
                            return res.render("layouts/login", {
                                website: _get.Pages().website,
                                login: req.isAuthenticated(),
                                user: req.user,
                                message: messageBird.fly,
                                name: `signup`,
                                breadcrumb: `Home - signup`,
                                msg: "Incorrect email or password!"
                            });
                        }
                        req.logIn(user, function (err) {
                            if (err) { return next(err); }
                            else {
                                // this part updates the cart with the data from the localStorage
                                for (let i = 0; i < cart_LS.length; i++) {
                                    const item = cart_LS[i];
                                    logger.logArg2("Logging", item.productID, item.quantity);
                                    cart.updateCart(item.productID, item.quantity, req.user._id);
                                }
                                messageBird.message("success", "Finished LogIn");
                                return res.redirect("back");
                            }
                        });
                    })(req, res, next);
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
