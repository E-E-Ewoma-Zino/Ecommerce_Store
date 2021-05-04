const _ = require("lodash");
const _get = require("./get");
const Users = require("../model/Users");
const Pages = require("../model/Pages");
const Products = require("../model/Products");
const find_duplicate = require("./find_duplicate");

module.exports = {
    // @desc    THIS SCRIPT GETS ALL THE PAGE CONTENT AND THEN EXPORTS IT
    Pages: () => allPages,
    // @desc    THIS SCRIPT GETS ALL THE PAGE CONTENT AND THEN EXPORTS IT
    AllProduct: () => allProducts,
    // @desc    THIS SCRIPT GETS ALL THE PRODUCTS CATEGORY NAMES AND THEIR LENGTH
    AllCategory: () => find_duplicate(allCategory),
    // @desc    THIS SCRIPT GETS ALL THE PRODUCTS COLORS NAMES AND THEIR LENGTH
    AllColor: () => find_duplicate(allColor),
    // @desc    THIS SCRIPT GETS ALL THE PRODUCTS BRAND NAMES AND THEIR LENGTH
    AllBrand: () => find_duplicate(allBrand),
    // @desc    THIS SCRIPT GETS FROM A CALLBACK FUNCTION ONE PRODUCT BY IT'S ID
    ProductByID: (id, result) => {
        Products.findById({ _id: id }, (err, product) => {
            result(err, product);
        });
    },
    // @desc    THIS SCRIPT GETS FROM A CALLBACK FUNCTION THE TEMP/CURRENT USER
    CurrentUser: (callback) => {
        Users.findOne({ email: "Tempemail@gmail.com" }, (err, user) => {
            if (err) {
                res.status(500).json({
                    mess: err
                });
            }
            else {
                // console.log(user);
                callback(user);
            }
        });
    }
};












// =================== Get All Pages ===============================
let allPages;  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function getPage(page) {
    allPages = await page;
}
// FIND ALL THE PAGES
Pages.findOne({}, (err, page) => {
    if (err) {
        console.error(err);
    }
    // console.log(page);
    getPage(page);
});
// =================== Get All Pages end===============================

// =================== Get All Products ===============================
let allProducts;  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function getAllProduct(product) {
    allProducts = await product;
}

// FIND ALL THE PRODUCTS
Products.find({}, (err, Product) => {
    if (err) {
        console.error(err);
    }
    getAllProduct(Product);
});
// =================== Get All products ends===============================



// =================== Get All Products Category ===============================
let allCategory = [];  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function AllCategory(product) {
    await product.forEach(element => {
        allCategory.push(_.toLower(element.category));
    });
}

// FIND ALL THE PRODUCTS
Products.find({ category: { $ne: null } }, (err, product) => {
    if (err) {
        console.error(err);
    }
    AllCategory(product);
});

// =================== Get All products ends===============================



// =================== Get All Products Color ===============================
let allColor = [];  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function AllColor(product) {
    await product.forEach(element => {
        allColor.push(_.toLower(element.color));
    });
}

// FIND ALL THE PRODUCTS
Products.find({ color: { $ne: null } }, (err, product) => {
    if (err) {
        console.error(err);
    }
    AllColor(product);
});

// =================== Get All products ends===============================

// =================== Get All Products Brand ===============================
let allBrand = [];  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function AllBrand(product) {
    await product.forEach(element => {
        allBrand.push(_.toLower(element.brand));
    });
}

// FIND ALL THE PRODUCTS
Products.find({ brand: { $ne: null } }, (err, product) => {
    if (err) {
        console.error(err);
    }
    AllBrand(product);
});

// =================== Get All products ends===============================
