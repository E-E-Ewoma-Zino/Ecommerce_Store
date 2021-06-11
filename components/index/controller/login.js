// all the logIn route code goes here
const passport = require("passport");
const Users = require(__dirname + "../../../../model/Users");
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");
const cart = require(__dirname + "../../../../middleware/cart_DB");

// to know from where the get req came from to get to login
let referer = "/";

module.exports = {
    get(req, res) {
        req.flash("error", "error messsage");
        req.flash("error", "error messsage 1");
        req.flash("key", "key messsage");
        const message = req.flash;
        logger.log(message);
        logger.log(req);
        // to make sure that the login and signUp always take you back to where you came from
        referer = req.headers.referer == req.originUrl + "/login" ? referer : req.headers.referer;
        try {
            res.render("layouts/login", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `LogIn`,
                breadcrumb: `Home - Login`
            });
        } catch (err) { 
            _bird.message("danger", err);
            console.error(":::", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                bird: _bird.fly
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
                    _bird.message("danger", err);
                    res.redirect("back");
                }
                else {
                    passport.authenticate('local', function (err, user, info) {
                        if (err) {
                            req.logOut();
                            _bird.message("danger", err);
                            return res.redirect("back");
                        }
                        if (!user) {
                            req.logOut();
                            // _bird.message("danger", "Incorrect email or password!");

                            return res.redirect("back");
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
                                logger.log(req.headers.referer);
                                if (req.headers.referer == "http://localhost:3000/checkout") return res.redirect("back");
                                return res.redirect(referer);
                            }
                        });
                    })(req, res, next);
                }
            });
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
                product: _get.AllProduct()
            });
        }
    }
}
