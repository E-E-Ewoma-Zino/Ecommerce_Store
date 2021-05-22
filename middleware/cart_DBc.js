
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const _ = require("lodash");
const _get = require("./get");
const Cart = require("../model/Cart");
const Users = require("../model/Users");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    getItems: async (userId, callback) => {
        const user = await Users.findById({ _id: userId }).exec((err, user)=>{
            Cart.findById({_id: user.cart}, (err, item) => {
                if (err) {
                    console.log(":::Err ", err);
                }else{
                    callback(err, item);
                }
            });

        });
        
    },
    updateCart: async (res, productID, userID) => {
        // get the user
        try {
            const user = await Users.findById({ _id: userID }).exec();
            console.log("user.id ", user._id);
            // get the user's cart
            try {
                const cart = await Cart.findById({ _id: user.cart }).exec();
                console.log("cart.id ", cart._id);
                // get the product
                _get.ProductByID(productID, async (product) => {
                    try {
                        console.log("Adding process");
                        // if cart is empty add to cart
                        if (cart.item.length == 0) {
                            console.log("ADD NEW PRODUCT");
                            await cart.item.push({ product: product });
                        }
                        else {
                            // for each elements in cart, check if productID is already in cart
                            for (let i = 0; i < cart.item.length; i++) {
                                const item = cart.item[i];
                                // if it is in cart remove
                                if (item.product._id == productID) {
                                    console.log("PRODUCT ALREADY EXIST");
                                    // delete an item if it already exist
                                    // cart.item.splice(i, 1);
                                    // console.log("PRODUCT DELETED");
                                    break;
                                }
                                // if loop is at the end and productID not found add it
                                // if product not in Cart
                                if (cart.item.length - 1 == i) {
                                    console.log("ADD NEW PRODUCT");
                                    await cart.item.push({ product: product });
                                    break;
                                }
                            }
                        }
                        // save cart
                        cart.save().then(() => {
                            console.log("Done");
                        }).catch((err) => {
                            console.log(":::err could not save ", err);
                        });
                    } catch (err) {
                        // catch product errors
                        console.log(":::err: ", err);
                    }
                });
            } catch (err) {
                // catch cart errors
                console.log(":::err: ", err);
            }
        }
        catch (err) {
            // catch user errors
            console.log(":::ERR: ", err);
        }
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