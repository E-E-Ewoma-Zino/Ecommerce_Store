const logger = require("../../../middleware/logger");

// all the cartItem route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const cart = require(__dirname + "../../../../middleware/cart_DB");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = {
	get(req, res) {

		// when a product is added to cart, we will get the 
		// USER, PRODUCT and ORDER
		// first User with _get.CurrentUser()
		// second product:
		try {
			if (req.isAuthenticated()) cart.userCart(req.user._id, (err, item) => {
				if (err) {
					console.log(err);
					_bird.message("danger", err);
					error500(req, res);//501
				}else{
					res.send(item);
				}
			});
			else res.send("No user loged in");

		} catch (err) {
			console.error(":::", err);
			_bird.message("danger", err);
			error500(req, res);
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
				if (req.body.length == 0 || undefined || null)	res.send([]);
				else	for (let i = 0; i < req.body.length; i++) {
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
			_bird.message("danger", err);
			error500(req, res);
		}
	}
}
