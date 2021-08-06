
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const _get = require("./get");
const Cart = require("../model/Cart");
const logger = require("./logger");
const _bird = require("./messageBird");

module.exports = {
	// @desc    THIS SCRIPT GETS THE CART ITEMS
	userCart: (userId, callback) => {

		_get.CurrentUser(userId, (user) => {
			Cart.findById({ _id: user.cart }).populate({
				path: "item",
				populate: "product"
			}).exec((err, cart) => {
				if (err) {
					console.log(":::err", err);
					callback(err, null);
				}
				else {
					callback(null, cart);
				}
			});
		});
	},
	updateCart: async function (productId, quantity, userId) {
		// get the user
		_get.CurrentUser(userId, (user) => {
			// get the user's cart
			this.userCart(userId, (err, cart) => {
				if (err) {
					console.log(err);
				} else {
					// get the product
					_get.ProductByID(productId, async (product) => {
						try {
							logger.log("Adding process");
							// if cart is empty add to cart
							if (cart.item.length == 0) {
								logger.log("ADD NEW PRODUCT");
								await cart.item.push({ product: product, quantity: quantity });
							}
							else {
								// for each elements in cart, check if productID is already in cart
								for (let i = 0; i < cart.item.length; i++) {
									const item = cart.item[i];
									// if it is in cart remove
									if (item.product._id == productId) {
										logger.log("PRODUCT ALREADY EXIST");
										// updating
										// i am very sorry for doing this. But nothing else was working :(
										// first: delete the product from array
										cart.item.splice(i, 1);
										logger.log("PRODUCT DELETED");
										// then: update it. forgive my bad code :(
										await cart.item.push({ product: product, quantity: quantity });
										// cart.item.quantity = quantity;
										logger.log("PRODUCT UPDATING");
										break;
									}
									// if loop is at the end and productID not found add it
									// if product not in Cart
									if (cart.item.length - 1 == i) {
										logger.log("ADD NEW PRODUCT");
										await cart.item.push({ product: product, quantity: quantity });
										break;
									}
								}
							}
							// save cart
							cart.save().then(() => {
								logger.log("Done");
							}).catch((error) => {
								console.log(":::err could not save ", error);
							});
						} catch (error) {
							// catch product errors
							console.log(":::err: ", error);
						}
					});
				}
			});
		});
	},
	delete: function (userId, itemId, callback) {
		console.log("Delete: ", itemId);
		console.log("User: ", userId);

		this.userCart(userId, (err, cart) => {
			// delete cart product
			if (err) {
				console.log(err);
			}else{
				for (let i = 0; i < cart.item.length; i++) {
					const item = cart.item[i];
					if (item.product._id == itemId) {
						console.log("Delete ", item.product._id, itemId);
						// remove that item from the array
						cart.item.splice(i, 1);
						// if you want you can return the deleted cart
						// return;
						break;
					}
					else {
						console.log("next");
					}
				}
				// save cart
				cart.save().then(() => {
					console.log("Done");
					// reload = true;
					// am using a callback to return true so i can only reload the page when it finished saving
					callback(true);
				}).catch((error) => {
					console.log(":::err could not save ", error);
				});
			}
		});
	}
}