// ALL ROUTES GOINT TO THE HOME "/" WILL BE IN THIS PAGE
const express = require("express");
const passport = require("passport");
const Cart = require("../model/Cart");
const Users = require("../model/Users");
const Orders = require("../model/Orders");
const _get = require("../middleware/get");
const search = require("../middleware/search");
const cart = require("../middleware/cart_DBc");
const tmpUser = require("../middleware/createTempUser");
const uploadPage = require("../middleware/uploadPages");
const { reverse } = require("lodash");

// TODO: FIND A WAY TO HANDLE ERRORS CAUSED BY NETWORK FAILURE


// This router is for the home / routes
const router = express.Router();

// @desc    uploadPages
uploadPage();
// @desc    create temp user
// tmpUser();


// @desc    Landing page
// @route   GET /
router.get("/", async (req, res) => {
    try {


        res.render("layouts/index", {
            home: _get.Pages().home,
            name: _get.Pages().home.name,
            website: _get.Pages().website,
            products: _get.AllProduct(),
            login: req.isAuthenticated(),
            user: req.user,
        });


    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});

// @desc    Category page
// @route   GET /category
router.get("/category", (req, res) => {
    let product;

    console.log(req.user);
    try {
        switch (req.query.type) {
            case "name":
                search.name(req.query.q, (result) => {
                    product = result;
                    res.render("layouts/category", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        name: _get.Pages().category.name,
                        breadcrumb: _get.Pages().category.breadcrumb,
                        products: product,
                        categories: _get.AllCategory(),
                        colors: _get.AllColor(),
                        brands: _get.AllBrand()
                    });
                });
                break;
            case "color":
                search.color(req.query.q, (result) => {
                    product = result;
                    res.render("layouts/category", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        name: _get.Pages().category.name,
                        breadcrumb: _get.Pages().category.breadcrumb,
                        products: product,
                        categories: _get.AllCategory(),
                        colors: _get.AllColor(),
                        brands: _get.AllBrand()
                    });
                });
                break;
            case "brand":
                search.brand(req.query.q, (result) => {
                    product = result;
                    res.render("layouts/category", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        name: _get.Pages().category.name,
                        breadcrumb: _get.Pages().category.breadcrumb,
                        products: product,
                        categories: _get.AllCategory(),
                        colors: _get.AllColor(),
                        brands: _get.AllBrand()
                    });
                });
                break;
            case "category":
                search.category(req.query.q, (result) => {
                    product = result;
                    res.render("layouts/category", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        name: _get.Pages().category.name,
                        breadcrumb: _get.Pages().category.breadcrumb,
                        products: product,
                        categories: _get.AllCategory(),
                        colors: _get.AllColor(),
                        brands: _get.AllBrand()
                    });
                });
                break;
            default:
                product = _get.AllProduct();
                res.render("layouts/category", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    name: _get.Pages().category.name,
                    breadcrumb: _get.Pages().category.breadcrumb,
                    products: product,
                    categories: _get.AllCategory(),
                    colors: _get.AllColor(),
                    brands: _get.AllBrand()
                });
                break;
        }
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});

// @desc    For all searches
// @route   POST /category
router.post("/category", (req, res) => {
    const searchTerm = req.body.search;
    console.log(searchTerm);
    let allSearch = [];

    try {
        search.name(searchTerm, (result) => {
            // console.log("my log" + search.color(searchTerm));
            // console.log("::The result is::" + result);
            result.forEach(ele => {
                allSearch.push(ele);
            });
        });
        search.color(searchTerm, (result) => {
            // console.log("::The result is::" + result);
            result.forEach(ele => {
                allSearch.push(ele);
            });
        });
        search.brand(searchTerm, (result) => {
            // console.log("::The result is::" + result);
            result.forEach(ele => {
                allSearch.push(ele);
            });
        });
        search.category(searchTerm, (result) => {
            // console.log("::The result is::" + result);
            result.forEach(ele => {
                allSearch.push(ele);
            });
            console.log(allSearch);
            res.render("layouts/category", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                name: _get.Pages().category.name,
                breadcrumb: _get.Pages().category.breadcrumb,
                products: allSearch,
                categories: _get.AllCategory(),
                search: searchTerm,
                colors: _get.AllColor(),
                brands: _get.AllBrand()
            });
        });
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});



// @desc    Contact page
// @route   GET /contact
router.get("/contact", (req, res) => {
    try {
        res.render("layouts/contact", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: _get.Pages().contact.name,
            breadcrumb: _get.Pages().contact.breadcrumb,
            contact: _get.Pages().contact.contact
        });

    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});


// @desc    Cart page
// @route   GET /cart
router.get("/cart", (req, res) => {

    try {
        // cart.setCart(req.query);

        // res.send("OK");
        if (req.isAuthenticated())
            cart.userCart(req.user._id, (item) => {
                res.render("layouts/cart", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    name: _get.Pages().cart.name,
                    breadcrumb: _get.Pages().cart.breadcrumb,
                    cart: item
                });
            });
        else res.render("layouts/cart", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: _get.Pages().cart.name,
            breadcrumb: _get.Pages().cart.breadcrumb
        });
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }

});


// @desc    Cart page
// @route   POST /cart
router.post("/cart", (req, res) => {
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
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});

// @desc    Cart page
// @route   DELETE /cart
router.delete("/cart", (req, res) => {
    try {
        const itemId = req.body.itemId;
        console.log(itemId);

        if (req.isAuthenticated()) cart.delete(req.user._id, itemId, (bool)=>{
            if(bool) res.redirect("/cart");
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
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});



// @desc    no-page
// @route   get /cartitem
router.get("/cartitem", (req, res) => {
    // when a product is added to cart, we will get the 
    // USER, PRODUCT and ORDER
    // first User with _get.CurrentUser()
    // second product:

    try {
        if (req.isAuthenticated()) cart.userCart(req.user._id, (item) => {
            res.send(item);
        });
        else res.send("No user loged in");
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});


// @desc    no-page
// @route   POST /cartitem
router.post("/cartitem", (req, res) => {
    // when a product is added to cart, we will get the 
    // USER, PRODUCT and ORDER
    // first User with _get.CurrentUser()
    // second product:

    try {
        // const productID = req.body.data.productID;
        // this is the total no of products that was ordered for
        // const quantity = req.body.data.quantity;
        if (req.isAuthenticated())
            cart.updateCart(req.body.productID, req.body.quantity, req.user._Id);
        else {
            // console.log(req.body);
            let arr = [];
            // if the postCartData from the cart_control sends an empty array do:
            if (req.body.length == 0 || undefined || null) res.send([]);
            for (let i = 0; i < req.body.length; i++) {
                const productId = req.body[i].productID;
                _get.ProductByID(productId, (result) => {
                    // console.log(result);
                    arr.push(result)
                    if (i == req.body.length - 1) res.send(arr);
                });
            }
        }
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            user: req.user,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            login: req.isAuthenticated(),
            website: _get.Pages().website,
            name: `500 - Internal server error!`,
            msg: err
        });
    }
});

// @desc    Checkout page
// @route   GET /checkout
router.get("/checkout", (req, res) => {
    try {
        res.render("layouts/checkout", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: _get.Pages().checkout.name,
            breadcrumb: _get.Pages().checkout.breadcrumb
        });

    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});


// @desc    login page
// @route   GET /login

router.get("/login", (req, res) => {
    try {
        res.render("layouts/login", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `LogIn`,
            breadcrumb: `Home - Login`,
            msg: ""
        });
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});

// @desc    login page
// @route   POST /login

router.post("/login", (req, res, next) => {

    try {
        const user = new Users({
            username: req.body.email,
            password: req.body.password
        });
        req.logIn(user, (err) => {
            if (err) {
                console.log("::::::::::::: " + err);
                res.render("layouts/login", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    name: `signup`,
                    breadcrumb: `Home - signup`,
                    msg: err
                });
            }
            else {
                passport.authenticate('local', function (err, user, info) {
                    if (err) {
                        return res.render("layouts/login", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            name: `signup`,
                            breadcrumb: `Home - signup`,
                            msg: err
                        });
                    }
                    if (!user) {
                        req.logOut();
                        return res.render("layouts/login", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            name: `signup`,
                            breadcrumb: `Home - signup`,
                            msg: "Incorrect email or password!"
                        });
                    }
                    req.logIn(user, function (err) {
                        if (err) { return next(err); }
                        return res.redirect("/");
                    });
                })(req, res, next);
            }
        });
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }

});


// @desc    Signup page
// @route   GET /signup

router.get("/signup", (req, res) => {
    try {
        res.render("layouts/signup", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `signup`,
            breadcrumb: `Home - signup`,
            msg: ""
        });
    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});


// @desc    SignUp page
// @route   POST /signup
router.post("/signup", (req, res) => {
    const newCart = new Cart();
    newCart.save();
    const newOrder = new Orders();
    newOrder.save();

    const newUser = new Users({
        zip: req.body.zip,
        cart: newCart._id,
        city: req.body.city,
        order: newOrder._id,
        username: req.body.email,
        country: req.body.country,
        company: req.body.company,
        phoneNo: req.body.phoneNo,
        lastname: req.body.lastname,
        address1: req.body.address1,
        address2: req.body.address2,
        firstname: req.body.firstname
    });

    Users.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(":::::::::::::::: " + err);
            res.render("layouts/signup", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                name: `signup`,
                breadcrumb: `Home - signup`,
                msg: err
            });
        }
        else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            })
        }
    });
});

// @desc    Logout page
// @route   POST /signup
router.get("/logout", (req, res) => {
    req.logOut()
    res.redirect("/");
})

// @desc    404 page
// @route   GET /404
router.get("", (req, res) => {
    try {
        res.render("layouts/404", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `404 - Can't find "${req.originalUrl}"`,
            breadcrumb: `home - ❓`,
            product: _get.AllProduct()
        });

    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
});

// @desc    500 page
// @route   GET /500

// router.get("/500", (req, res) => {
//     res.render("layouts/500", {
//         website: _get.Pages().website,
//         login: req.isAuthenticated(),
//         user: req.user,
//         name: `500 - Internal server error!`,
//         breadcrumb: `❌🤦‍♂️`,
//         msg: "undefined"
//     });
// });

module.exports = router;

// { "_id" : ObjectId("6084659c00a2f4083c683ef9"), "isAvaliable" : false, "description" : "A good chair", "name" : "Chair 1", "img" : "img/product/product_1.png", "price" : "20,000", "category" : "chair", "color" : "blue", "totalNo" : 4, "createdAt" : ISODate("2021-04-24T18:38:20.237Z"), "__v" : 0 }
// { "_id" : ObjectId("608465d22064ea122c94709e"), "isAvaliable" : false, "description" : "A good chair for you", "name" : "Chair 2", "img" : "img/product/product_2.png", "price" : "23,000", "category" : "chair", "color" : "green", "totalNo" : 2, "createdAt" : ISODate("2021-04-24T18:39:14.094Z"), "__v" : 0 }
// { "_id" : ObjectId("608467231e14df1a283d9b5a"), "isAvaliable" : false, "description" : "Super chair", "name" : "Chair 3", "img" : "img/product/product_3.png", "price" : "33,000", "category" : "chair", "color" : "red", "totalNo" : 3, "createdAt" : ISODate("2021-04-24T18:44:51.283Z"), "__v" : 0 }
// { "_id" : ObjectId("608468fa21cee927c060be08"), "isAvaliable" : true, "description" : "New and improved chair", "name" : "Chair 4", "img" : "img/product/product_4.png", "price" : "9,000", "category" : "chair", "color" : "white", "totalNo" : 1, "createdAt" : ISODate("2021-04-24T18:52:42.794Z"), "__v" : 0 }
// { "_id" : ObjectId("6084692021cee927c060be09"), "isAvaliable" : true, "description" : "Single chair", "name" : "Chair 5", "img" : "img/product/product_5.png", "price" : "21,400", "category" : "chair", "color" : "red", "totalNo" : 2, "createdAt" : ISODate("2021-04-24T18:53:20.706Z"), "__v" : 0 }
// { "_id" : ObjectId("6084699021cee927c060be0a"), "isAvaliable" : true, "description" : "Ultimate chair", "name" : "Chair 6", "img" : "img/product/product_6.png", "price" : "600,000", "category" : "chair", "color" : "gree", "totalNo" : null, "createdAt" : ISODate("2021-04-24T18:55:12.101Z"), "__v" : 0 }
// { "_id" : ObjectId("608469c221cee927c060be0b"), "isAvaliable" : true, "description" : "My own chair", "name" : "Chair 7", "img" : "img/product/product_7.png", "price" : "1,200,000", "category" : "chair", "color" : "green", "totalNo" : 3, "createdAt" : ISODate("2021-04-24T18:56:02.810Z"), "__v" : 0 }
// { "_id" : ObjectId("608469eb21cee927c060be0c"), "isAvaliable" : true, "description" : "Last chair in store", "name" : "Chair 8", "img" : "img/product/product_3.png", "price" : "8000", "category" : "chair", "color" : "blue", "totalNo" : 9, "createdAt" : ISODate("2021-04-24T18:56:43.194Z"), "__v" : 0 }
// { "_id" : ObjectId("60848d6dddcbcf1a9ce61d50"), "isAvaliable" : true, "description" : "Not a chair", "name" : "Not chair", "img" : "img/product/product_3.png", "price" : "1,000,000,000", "category" : "Watch", "color" : "red", "totalNo" : 3, "createdAt" : ISODate("2021-04-24T21:28:13.348Z"), "__v" : 0 }
// { "_id" : ObjectId("60848d87ddcbcf1a9ce61d51"), "isAvaliable" : true, "description" : "skajdan", "name" : "Chair asn", "img" : "img/product/product_1.png", "price" : "20,000", "category" : "Chair", "color" : "gree", "totalNo" : 0, "createdAt" : ISODate("2021-04-24T21:28:39.824Z"), "__v" : 0 }

// order
// {
//     "_id" : ObjectId("60884a3cf90ec78c6d4c37c2"),
//     "user" : ObjectId("608739145e2e22244c3d7823"),
//     "product" : [ 
//         {
//             "product" : ObjectId("6084659c00a2f4083c683ef9"),
//             "quantity" : 4
//         }
//     ]
// }