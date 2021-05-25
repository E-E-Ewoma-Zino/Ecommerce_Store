
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const _ = require("lodash");
const _get = require("./get");
const Cart = require("../model/Cart");
const Users = require("../model/Users");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    userCart: (userId, callback) => {

        _get.CurrentUser(userId, (user) => {
            Cart.findById({ _id: user.cart }).then((cart) => {
                callback(err, item);
            }).catch((err) => {
                // catch cart errors
                console.log(":::Err ", err);
            });
        });

    },
    updateCart: async (productID, userID) => {
        // get the user
        _get.CurrentUser(userId, (user) => {
            console.log("user.id ", user._id);
            // get the user's cart
            this.userCart(userId, (cart)=>{
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
            });
        });
    },
    delete: (userId, itemId) => {
        console.log("Delete: ", itemId);

        this.userCart(userId, (cart)=>{
            // delete cart product
        })
    }
}
