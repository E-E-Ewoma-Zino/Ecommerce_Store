const mongoose = require("mongoose");

// @desc    Order Schema
const orderSchema = new mongoose.Schema({
    user: String,
    cart: Array,
    total: String,
    coupon: String,
    details: Object,
    shipping: String,
    subtotal: String,
    orderMethod: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);

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