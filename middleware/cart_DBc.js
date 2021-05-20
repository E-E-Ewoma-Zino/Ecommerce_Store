
// THIS FILE CONTROLES THE MONGOOSE DATABASE FOR CART
const Cart = require("../model/Cart");
const _get = require("./get");
const Users = require("../model/Users");

module.exports = {
    // @desc    THIS SCRIPT GETS THE CART ITEMS
    getItems: (callback) => {
        Cart.find({}, (err, items) => {
            callback(err, items);
        });
    },
    updateCart: (productID, user) => {
        // get the user
        Users.findById({_id: user}, (err, user)=>{
            if (err) {
                console.log(":::ERR: ", err);
            }else{
                // get the product
                _get.ProductByID(productID, (err, product)=>{
                    if (err) {
                        console.log(":::err: ", err);
                    }
                    else{
                        // get the user's cart
                        console.log("user cart ", user.cart);
                        Cart.findById({_id: user.cart}, (err, cart)=>{
                            if (err) {
                                console.log("::err ", err);
                            }else{
                                // if product not in Cart
                                
                                cart.item.push({product: product});
                                cart.save((err)=>{
                                    if (err) {
                                        console.log(":::err ", err);
                                    }
                                    else{
                                        console.log(":::Added cart to user");
                                    }
                                });
                            }
                        });
                        console.log(":::cart ", product);
                        // const newCart = new Cart({
                        //     product: product
                        // });

                        // newCart.save((err)=>{
                        //     if (err) {
                        //         console.log(":::err ", err);
                        //     }
                        //     else{
                        //         console.log(":::Added cart to user");
                        //         user.cart = newCart._id;
                        //         user.save();
                        //     }
                        // });
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