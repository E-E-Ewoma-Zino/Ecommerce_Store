const mongoose = require("mongoose");




module.exports = (u) => {
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

    userSchema.plugin(u);
    return mongoose.model("User", userSchema);
}
