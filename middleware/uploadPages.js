const Pages = require("../model/Pages");



const pages = new Pages({
    website: require("../pages/website.json"),
    home: require("../pages/home.json"),
    checkout: require("../pages/checkout.json"),
    contact: require("../pages/contact.json"),
    category: require("../pages/category.json"),
    cart: require("../pages/cart.json"),
    single: require("../pages/single.json"),
    addProduct: require("../pages/admin_addProduct.json")
});





module.exports = () => {
    if (process.env.NODE_ENV == "Development") {
        Pages.find({}, (err, page) => {
            if (err) {
                console.error(":::::::" + err);
            }
            else if (page.length == 0) {
                Pages.insertMany(pages, (err) => {
                    if (err) {
                        console.error(":::::::" + err);
                    }
                    else {
                        console.log("Uploaded Pages To DB");
                    }
                });
            }
            else {
                console.log(page.length, "Pages already in DB");
            }
        });
    }
    else{
        console.log(`Can not load pages because app is in ${process.env.NODE_ENV} mode`);
    }
};