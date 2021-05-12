
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const Cart = require("../model/Cart");
const _get = require("./get");
const Orders = require("../model/Orders");
const Users = require("../model/Users");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    getItems: (callback) => {
        Cart.find({}, (err, items) => {
            callback(err, items);
        });
    },
    updateCart: (productID, amount) => {
        Cart.find({}, (err, item) => {
            if (err) {
                console.log(":::::", err);
            } else {
                let i;
                for (i = 0; i < item.length; i++) {
                    const order = item[i];

                    if (order.product._id == productID) {
                        console.log("Update the cart");
                        order.amount = amount;
                        order.save();
                        return;
                    }
                    else {
                        console.log("next");
                    }
                }
                if (item.length == i) {
                    console.log("Create new cart item");
                    _get.ProductByID(productID, (err, product) => {
                        if (err) {
                            console.log(":::::", err);
                        }
                        else {
                            const newItem = new Cart({
                                product: product,
                                amount: amount
                            });

                            newItem.save();
                        }
                    });
                }
            }
        })
    },
    assignCart: () => {
        // create the order for the user
        // update user Cart
        _get.CurrentUser((user) => {

            Cart.find({}, (err, items) => {
                if (err) {
                    console.log("::::::::", err);
                }
                else {
                    const newOrder = new Orders({
                        user: user._id,
                        product: items
                    });
                    newOrder.save();
                    Users.updateOne({ _id: user._id }, { order: newOrder._id }, (err) => {
                        if (err) {
                            console.log("::::::::", err);
                        }
                    });
                }
            });
        });
    },
    delete: (itemId) => {
        Cart.deleteOne({ _id: itemId }, (err) => {
            if (err) {
                console.log("::::::::::::", err);
            }
        });
    },
    setCart: (arr)=>{
        console.log("h arr: ", h(arr));
        return h(arr);
    }
}

