const _ = require("lodash");
const Users = require("../model/Users");
const Pages = require("../model/Pages");
const Products = require("../model/Products");
const find_duplicate = require("./find_duplicate");

module.exports = {
	// @desc	THIS SCRIPT GETS ALL THE PAGE CONTENT AND THEN EXPORTS IT
	Pages: (callback) => {
		Pages.findOne({}, (err, page) => {
			if (err) {
				console.error(err);
				callback(err, null);
			}else{
				callback(null, page);
			}
		});
	},
	// @desc	THIS SCRIPT GETS ALL THE PAGE CONTENT AND THEN EXPORTS IT
	AllProduct: (callback) => {
		Products.find({}, (err, products)=>{
			if(err){
				console.log(":::", err);
				callback(err, null);
			}else{
				callback(null, products);
			}
		});
	},
	// @desc	THIS SCRIPT GETS ALL THE PRODUCTS CATEGORY NAMES AND THEIR LENGTH
	AllCategory: () => find_duplicate(allCategory),
	// @desc	THIS SCRIPT GETS ALL THE PRODUCTS COLORS NAMES AND THEIR LENGTH
	AllColor: () => find_duplicate(allColor),
	// @desc	THIS SCRIPT GETS ALL THE PRODUCTS BRAND NAMES AND THEIR LENGTH
	AllBrand: () => find_duplicate(allBrand),
	// @desc	THIS SCRIPT GETS FROM A CALLBACK FUNCTION ONE PRODUCT BY IT'S ID
	ProductByID: async (id, callback) => {
		try {
			const product = await Products.findById({ _id: id }).exec();
			callback(product);
		} catch (err) {
			console.log(":::err ", err);
		}
	},
	// @desc	THIS SCRIPT GETS FROM A CALLBACK FUNCTION THE TEMP/CURRENT USER
	CurrentUser: (userId, callback) => {
		Users.findOne({ _id: userId }).then((user) => {
			callback(user);
		}).catch((err) => {
			// catch user errors
			console.error("::::ERR ", err);
		});
	},
};



// =================== Get All Products Category ===============================
let allCategory = [];  // TO STORE THE CONTENT

// FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
async function AllCategory(product) {
	await product.forEach(element => {
		allCategory.push(_.toLower(element.category));
	});
}



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
