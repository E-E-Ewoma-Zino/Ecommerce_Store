const mongoose = require("mongoose");

// @desc    User Schema
const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    address2: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String,
    },
    company: {
        type: String
    },
    order: {
        type: []
    },
    zip: {
        type: String
    },
    note: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
