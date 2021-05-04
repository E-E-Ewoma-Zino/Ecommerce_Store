const Cart = require("../model/Cart");





module.exports = {
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
    }
}







































// _get.CurrentUser((user) => {

//     Orders.findById({ _id: user.order }, (err, order) => {
//         if (err) {
//             console.log(":::::", err);
//         }
//         else {
//             // adds the user id to the order
//             order.user = user._id;
//             let i;

//             for (i = 0; i < order.product.length; i++) {
//                 const item = order.product[i];

//                 if (item.productId === productID) {
//                     console.log("Updated Product");
//                     Orders.updateOne(
//                         {
//                             "_id": order._id,
//                             "product.productId": productID
//                         },
//                         {
//                             $set: {
//                                 "product.$.amount": amount,
//                             }
//                         },
//                         (err) => {
//                             if (err) {
//                                 console.log("::::EEE:::", err);
//                             }
//                         }
//                     );
//                     break;
//                 }
//                 else {
//                     console.log("next");
//                 }
//             }
//             if (i == order.product.length) {
//                 console.log("Created new Product");
//                 order.product.push({
//                     productId: productID,
//                     amount: amount
//                 });
//             }
//             order.save();
//         }
//     })
// })