// all the admin/addProduct code goes here
const _ = require("lodash");
const Products = require(__dirname + "../../../../model/Products");
const _cat = require(__dirname + "../../../../middleware/category");
const logger = require(__dirname + "../../../../middleware/logger");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = {
	get(req, res) {
		try {
			_cat.sortAndPopulate((err, all) => {
				if (err) {
					console.log(":::err", err);
					_bird.message("danger", err);
				}
				res.render("admin/addProduct", {
					bird: _bird.fly,
					category: all
				});
			});

		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	},
	post: async function (req, res) {

		// console.log(req.files);
		// console.log("::::::::::", req.body);
		// 
		// 
		let cat = req.body.category ? JSON.parse(req.body.category) : [];

		try {
			const newProduct = new Products({
				img: req.files,
				price: req.body.price,
				totalNo: req.body.totalNo,
				brand: _.toLower(req.body.brand),
				color: _.toLower(req.body.color),
				name: _.toLower(req.body.name[0]),
				description: req.body.description,
				categories: cat
			});

			newProduct.save((err) => {
				if (err) {
					console.log(":::::", err);
					_bird.message("danger", err);
					_bird.message("danger", "Could Not Add Product");
					res.redirect("back");
				}
				else {
					_bird.message("success", "Successfully Added New Product");
					console.log("Added new product");
					_cat.addProduct(newProduct._id, newProduct.categories);
					res.redirect("back");
				}
			});
		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	}
}