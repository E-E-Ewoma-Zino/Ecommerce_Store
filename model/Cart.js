const mongoose = require("mongoose");

// @desc    cart Schema
const cartSchema = new mongoose.Schema({
	item: [{
		product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
		quantity: String
	}],
	createdAt:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Cart", cartSchema);    