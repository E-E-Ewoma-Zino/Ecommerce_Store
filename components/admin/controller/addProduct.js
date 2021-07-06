// all the admin/addProduct code goes here
const _ = require("lodash");
const _get = require(__dirname + "../../../../middleware/get");
const _cat = require(__dirname + "../../../../middleware/category");
const Products = require(__dirname + "../../../../model/Products");
const logger = require(__dirname + "../../../../middleware/logger");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = {
	get(req, res) {
		try {
			_cat.sortAndPopulate((err, all)=>{
				if(err){
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
			res.render("layouts/500", {
				website: _get.Pages().website,
				login: req.isAuthenticated(),
				user: req.user,
				bird: _bird.fly,
				name: `500 - Internal server error!`,
				breadcrumb: `❌🤦‍♂️`,
				product: _get.AllProduct()
			});
		}
	},
	post: async function (req, res) {

		// console.log(req.body);
		try {
			// console.log("::::::::::", req.body);
				const newProduct = new Products({
					name: _.toLower(req.body.name),
					brand: _.toLower(req.body.brand),
					img: req.files,
					color: _.toLower(req.body.color),
					category: req.body.category,
					price: req.body.price,
					description: req.body.description,
					totalNo: req.body.totalNo
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
						res.redirect("back");
					}
				});
		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			res.render("layouts/500", {
				website: _get.Pages().website,
				login: req.isAuthenticated(),
				user: req.user,
				bird: _bird.fly,
				name: `500 - Internal server error!`,
				breadcrumb: `❌🤦‍♂️`,
				product: _get.AllProduct()
			});
		}
	}
}