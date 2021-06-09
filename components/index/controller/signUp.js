// all the signUp route code goes here

const passport = require("passport");
const Cart = require(__dirname + "../../../../model/Cart");
const Users = require(__dirname + "../../../../model/Users");
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");
const cart = require(__dirname + "../../../../middleware/cart_DB");

// to know from where the get req came from to get to login
let referer = "/";

module.exports = {
    get(req, res) {

        referer = req.headers.referer;
        try {
            res.render("layouts/signup", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `signup`,
                breadcrumb: `Home - signup`,
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
                product: _get.AllProduct(),
            });
        }
    },
    post(req, res) {

        try {
            const newCart = new Cart();
            newCart.save();
            // to make sure that the login and signUp always take you back to where you came from
            referer = req.headers.referer == "http://localhost:3000/signup" ? referer : req.headers.referer;

            // get the data from the cart_LocalStorage
            const cart_LS = req.body.cartData == "null" ? [] : JSON.parse(req.body.cartData);
            logger.logArg("something", cart_LS);
            logger.logArg("something Again", typeof cart_LS);

            const newUser = new Users({
                zip: req.body.zip,
                cart: newCart._id,
                city: req.body.city,
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
                    _bird.message("danger", err);
                    res.redirect('back');
                }
                else {
                    passport.authenticate("local")(req, res, () => {
                        // this part updates the cart with the data from the localStorage
                        for (let i = 0; i < cart_LS.length; i++) {
                            const item = cart_LS[i];
                            logger.logArg2("Logging", item.productID, item.quantity);
                            cart.updateCart(item.productID, item.quantity, req.user._id);
                        }
                        _bird.message("success", "Welcome " + req.user.firstname);
                        res.redirect(referer);
                    });
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
                product: _get.AllProduct(),

            });
        }
    }
}
