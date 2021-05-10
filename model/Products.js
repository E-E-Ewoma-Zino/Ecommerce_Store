const mongoose = require("mongoose");

// @desc    Product Schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    img: {
        type: [],
        required: true
    },
    color: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    totalNo: {
        type: Number,
    },
    isAvaliable: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);