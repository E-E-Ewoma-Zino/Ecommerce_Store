const mongoose = require("mongoose");

// @desc    categort Schema
const categortSchema = new mongoose.Schema({
    category: [{
        name: String,
        subCategory: [{}]
    }]
});

module.exports = mongoose.model("Categort", categortSchema);

// {
//     user: 1234567890,
//     orders: [
//         {
//             item: [{
//              product: Object,
//              quantity: String
//          }]
//         }
//     ]
// }