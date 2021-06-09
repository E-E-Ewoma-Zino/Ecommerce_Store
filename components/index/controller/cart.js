// all the cart route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const cart = require(__dirname + "../../../../middleware/cart_DB");


module.exports = {
    get(req, res) {
        
        try {
            // cart.setCart(req.query);

            // res.send("OK");
            if (req.isAuthenticated()) cart.userCart(req.user._id, (item) => {
                    res.render("layouts/cart", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        bird: _bird.fly,
                        name: _get.Pages().cart.name,
                        breadcrumb: _get.Pages().cart.breadcrumb,
                        cart: item
                    });
                });
            else res.render("layouts/cart", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: _get.Pages().cart.name,
                breadcrumb: _get.Pages().cart.breadcrumb
            });
        
         } catch (err) {
            console.error(":::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),

            });
        }
    },
    post(req, res) {
        
        // when a product is added to cart, we will get the 
        // USER, PRODUCT and ORDER
        // first User with _get.CurrentUser()
        // second product:

        try {
            // const productID = req.body.data.productID;
            // this is the total no of products that was ordered for
            // const quantity = req.body.data.quantity;

            // console.log(productID, quantity);

            cart.updateCart(productID, req.user._id);
            res.redirect("/cart");
        
         } catch (err) {
            console.error(":::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),

            });
        }
    },
    delete(req, res) {
        
        try {
            const itemId = req.body.itemId;
            console.log(itemId);

            if (req.isAuthenticated()) cart.delete(req.user._id, itemId, (bool) => {
                if (bool) res.redirect("/cart");
                else {
                    // so the browser would wait for the item to delete before reloading
                    setTimeout(() => {
                        res.redirect("/cart");
                    }, 7000);
                }
            });
            else res.redirect("/login");
        
         } catch (err) {
            console.error(":::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),

            });
        }
    }
}