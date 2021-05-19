const mongoose = require("mongoose");

// @desc    cart Schema
const cartSchema = new mongoose.Schema({
    product:  Array,
    amount: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Cart", cartSchema);