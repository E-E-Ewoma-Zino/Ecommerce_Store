
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const _get = require("./get");
const Cart = require("../model/Cart");
const logger = require("./logger");
const _bird = require("./messageBird");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    userCart: (userId, callback) => {

        _get.CurrentUser(userId, (user) => {
            Cart.findById({ _id: user.cart }).then((cart) => {
                callback(cart);
            }).catch((err) => {
                // catch cart errors
                console.log(":::Err ", err);
                callback(err)
            });
        });
    },
    updateCart: async function (productId, quantity, userId) {
        logger.log(":OKOK:", productId, quantity, userId);
        // get the user
        _get.CurrentUser(userId, (user) => {
            logger.log("user.id ", user._id);
            // get the user's cart
            this.userCart(userId, (cart) => {
                logger.log("cart.id ", cart._id);
                // get the product
                _get.ProductByID(productId, async (product) => {
                    try {
                        logger.log("Adding process");
                        // if cart is empty add to cart
                        if (cart.item.length == 0) {
                            logger.log("ADD NEW PRODUCT");                           
                            await cart.item.push({ product: product, quantity: quantity });
                        }
                        else {
                            // for each elements in cart, check if productID is already in cart
                            for (let i = 0; i < cart.item.length; i++) {
                                const item = cart.item[i];
                                // if it is in cart remove
                                if (item.product._id == productId) {
                                    logger.log("PRODUCT ALREADY EXIST");

                                    // updating
                                    // i am very sorry for doing this. But nothing else was working :(
                                    // first: delete the product from array
                                    cart.item.splice(i, 1);
                                    logger.log("PRODUCT DELETED");
                                    // then: update it. forgive my bad code :(
                                    await cart.item.push({ product: product, quantity: quantity });
                                    // cart.item.quantity = quantity;
                                    logger.log("PRODUCT UPDATING");                                   
                                    break;
                                }
                                // if loop is at the end and productID not found add it
                                // if product not in Cart
                                if (cart.item.length - 1 == i) {
                                    logger.log("ADD NEW PRODUCT");                                    
                                    await cart.item.push({ product: product, quantity: quantity });
                                    break;
                                }
                            }
                        }
                        // save cart
                        cart.save().then(() => {
                            logger.log("Done");
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
    delete: function (userId, itemId, callback) {
        console.log("Delete: ", itemId);
        console.log("User: ", userId);

        this.userCart(userId, (cart) => {
            // delete cart product
            for (let i = 0; i < cart.item.length; i++) {
                const item = cart.item[i];
                if (item.product._id == itemId) {
                    console.log("Delete ", item.product._id, itemId);
                    // remove that item from the array
                    cart.item.splice(i, 1);
                    // if you want you can return the deleted cart
                    // return;
                    break;
                }
                else {
                    console.log("next");
                }
            }
            // save cart
            cart.save().then(() => {
                console.log("Done");
                // reload = true;
                // am using a callback to return true so i can only reload the page when it finished saving
                callback(true);
            }).catch((err) => {
                console.log(":::err could not save ", err);
            });
        });
        // return reload;
    }
}



// db.carts.update({_id: "60ac51316bf61733b8ab57cf"}, {$set: {"item.0.quantity": 20}})
// 60b29af5da3b342b08eb0585