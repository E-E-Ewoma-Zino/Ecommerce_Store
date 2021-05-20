const mongoose = require("mongoose");

// @desc    cart Schema
const cartSchema = new mongoose.Schema({
    item: [{
        product: Object,
        quantity: String
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Cart", cartSchema);