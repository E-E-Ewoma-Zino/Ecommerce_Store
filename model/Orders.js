const mongoose = require("mongoose");

// @desc    Order Schema
const orderSchema = new mongoose.Schema({
    user: {
        type: String
    },
    product: {
        type: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);