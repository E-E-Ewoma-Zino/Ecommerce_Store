
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const _ = require("lodash");
const _get = require("./get");
const Cart = require("../model/Cart");
const Users = require("../model/Users");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    getItems: (callback) => {
        Cart.find({}, (err, items) => {
            callback(err, items);
        });
    },
    updateCart: (res, productID, user) => {
        // get the user
        Users.findById({ _id: user }, (err, user) => {
            if (err) {
                console.log(":::ERR: ", err);
            } else {
                // get the user's cart
                // if product not in Cart
                Cart.findById({ _id: user.cart }, (err, cart) => {
                    if (err) {
                        console.log(":::err: ", err);
                    }
                    else {
                        // get the product
                        _get.ProductByID(productID, (err, product) => {
                            if (err) {
                                console.log(":::err: ", err);
                            }
                            else {

                                // for each elements in cart, check if productID is already in cart
                                for (let i = 0; i <= cart.item.length; i++) {
                                    const item = cart.item[i];
                                    // if it is in cart remove
                                    try {
                                        if (item.product._id == productID) {
                                            console.log("PRODUCT ALREADY EXIST");
                                            // delete an item if it already exist
                                            cart.item.splice(i, 1);
                                            console.log("PRODUCT DELETED");
                                            break;
                                        } else {
                                            // console.log("Next");
                                            // NEXT
                                        }

                                    } catch (err) {
                                        console.log("catch");
                                    }

                                    // if loop is at the end and productID not found add it
                                    if (cart.item.length == i) {
                                        console.log("ADD NEW PRODUCT");
                                        cart.item.push({ product: product });
                                        break;
                                    }
                                    // if (i == cart.item.length) break;
                                }
                                // if cart is empty add to cart
                                // if (cart.item.length == 0) {
                                //     console.log("ADD NEW PRODUCT");
                                //     cart.item.push({ product: product });
                                // }
                                // save cart
                                cart.save((err) => {
                                    if (err) {
                                        console.log(":::err ", err);
                                    }
                                    else {
                                        console.log("Updated cart");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    delete: (itemId) => {
        Cart.deleteOne({ _id: itemId }, (err) => {
            if (err) {
                console.log("::::::::::::", err);
            }
        });
    }
}



// Cart.find({}, (err, item) => {
//     if (err) {
//         console.log(":::::", err);
//     } else {
//         let i;
//         for (i = 0; i < item.length; i++) {
//             const order = item[i];

//             if (order.product._id == productID) {
//                 console.log("Update the cart");
//                 order.quantity = quantity;
//                 order.save();
//                 return;
//             }
//             else {
//                 console.log("next");
//             }
//         }
//         if (item.length == i) {
//             console.log("Create new cart item");
//             _get.ProductByID(productID, (err, product) => {
//                 if (err) {
//                     console.log(":::::", err);
//                 }
//                 else {
//                     const newItem = new Cart({
//                         product: product,
//                         quantity: quantity
//                     });

//                     newItem.save();
//                 }
//             });
//         }
//     }
// })