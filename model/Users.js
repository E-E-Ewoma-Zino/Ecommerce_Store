const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// @desc    User Schema
const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
    },
    address1: {
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
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" },],
    zip: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose);


module.exports = new mongoose.model("User", userSchema);