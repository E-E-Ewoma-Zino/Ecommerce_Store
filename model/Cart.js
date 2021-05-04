const mongoose = require("mongoose");

// @desc    cart Schema
const cartSchema = new mongoose.Schema({
    product:  Object,
    amount: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Cart", cartSchema);