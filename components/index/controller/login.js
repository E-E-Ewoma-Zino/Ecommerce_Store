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
        // to make sure that the login and signUp always take you back to where you came from
        let prev = req.headers.referer == undefined ? "/" : req.headers.referer;
        if (prev.slice(prev.search("/login")) === "/login" || prev.slice(prev.search("/signup")) === "/signup") {
            referer = referer;
        }
        else {
            referer = prev;
        }
        logger.log(prev.slice(prev.search("/login")), "=", "/login");
        logger.log("1", referer);
        if (req.isAuthenticated()) {
            logger.log("2", referer);
            return res.redirect(referer);
        }
        // if at anytime "referer" == login Page, assign a different route to "referer"
        // if(referer == req.header.host + "/login" ||  referer == req.header.host + "/signup") referer = "/";
        logger.log("3", referer);

        try {
            res.render("layouts/login", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `LogIn`,
                breadcrumb: `Home - Login`,
                userEmail: ""
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
            let prev = req.headers.referer == undefined ? "/" : req.headers.referer;
            // get the data from the cart_LocalStorage
            const cart_LS = req.body.cartData == "null" ? [] : JSON.parse(req.body.cartData);
            // check if referer is undefine
            // if(typeof referer == undefined) referer = "/category";

            logger.log("type", typeof referer);


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
                            console.log(":::err", err);
                            return res.redirect("back");
                        }
                        if (!user) {
                            req.logOut();
                            _bird.message("danger", "Incorrect email or password!");
                            // if the login is coming from checkout redirect back
                            if (prev.slice(prev.search("/checkout")) == "/checkout") return res.redirect("back");
                            logger.log("1no");
                            return res.render("layouts/login", {
                                website: _get.Pages().website,
                                login: req.isAuthenticated(),
                                user: req.user,
                                bird: _bird.fly,
                                name: `LogIn`,
                                breadcrumb: `Home - Login`,
                                userEmail: req.body.email
                            });
                        }
                        req.logIn(user, function (err) {
                            logger.log("2no");
                            if (err) { return next(err); }
                            else {
                                // this part updates the cart with the data from the localStorage
                                for (let i = 0; i < cart_LS.length; i++) {
                                    const item = cart_LS[i];
                                    cart.updateCart(item.productID, item.quantity, req.user._id);
                                    _bird.message("primary", "Done sync" + "product" + i + 1);
                                }
                                // if the login is coming from checkout redirect back
                                logger.log("4", prev);
                                if (prev.slice(prev.search("/checkout")) == "/checkout") return res.redirect("back");
                                _bird.message("success", "Welcome back 😀 " + req.user.firstname);
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
