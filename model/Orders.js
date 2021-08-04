const mongoose = require("mongoose");

// @desc    Order Schema
const orderSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
	total: String,
	coupon: String,
	details: Object,
	shipping: String,
	subtotal: String,
	flutterwave: Object,
	orderMethod: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Order", orderSchema);