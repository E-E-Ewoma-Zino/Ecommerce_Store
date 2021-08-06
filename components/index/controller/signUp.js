// all the signUp route code goes here

const passport = require("passport");
const Cart = require(__dirname + "../../../../model/Cart");
const Users = require(__dirname + "../../../../model/Users");
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");
const cart = require(__dirname + "../../../../middleware/cart_DB");

// to know from where the get req came from to get to signup
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
		// so the user cant come back to the login route after signing in
		if (req.isAuthenticated()) {
			logger.log("2", referer);
			return res.redirect(referer);
		}
		try {
			_get.Pages((err, page) => {
				if (err) {
					console.error(":::", err);
				} else {
					res.render("layouts/signup", {
						website: page.website,
						login: req.isAuthenticated(),
						user: req.user,
						bird: _bird.fly,
						name: `signup`,
						breadcrumb: `Home - signup`,
					});
				}
			});
		} catch (err) {
			console.error(":::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	},
	post(req, res) {

		try {
			// create a cart for the user
			const newCart = new Cart();

			// get the data from the cart_LocalStorage
			const cart_LS = req.body.cartData == "null" ? [] : JSON.parse(req.body.cartData);

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
						// save the new users cart
						newCart.save();
						// this part updates the cart with the data from the localStorage
						for (let i = 0; i < cart_LS.length; i++) {
							const item = cart_LS[i];
							logger.log("Logging", item.productID, item.quantity);
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
			error500(req, res);
		}
	}
}
