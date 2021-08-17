const Category = require(__dirname + "../../../../model/Category");
const _cat = require(__dirname + "../../../../middleware/category");

module.exports = {
	get(req, res) {
		try {
			_cat.sortAndPopulate((err, all) => {
				if (err) {
					console.log(":::", err);
					res.send(err);
				}
				else {
					res.send(all);
				}
			});

		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	},
	post: function (req, res) {

		try {
			console.log(req.body);

			const newCategory = new Category({
				name: req.body.name,
				product: req.body.product,
				parents: req.body.parent
			});

			console.log(newCategory.parents);
			// if newCategory has a parent then it should:
			// 1. be a child of the parent
			// 2. contain all the parents from father to Adam
			if (newCategory.parents.length) {
				console.log("It has a parent");
				_cat.newChild(newCategory);
				// 
				_cat.newParent(newCategory, () => {
					res.redirect("back");
				});
			} else {
				console.log("It has No parent");
				newCategory.save((err) => {
					if (err) {
						console.log(err);
					}
					else {
						res.redirect("back");
					}
				});
			}

		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	},
	delete: (req, res) => {
		console.log(req.query);
		_cat.deleteOne({ _id: req.query.q }, (err, done) => {
			if (err) {
				console.log("err:::", err);
				res.sendStatus(500).json();
				return;
			}
			else if (done) {
				res.send("Deleted " + req.query.q);
			}
			else {
				_bird.message("danger", "Nanda care!");
				res.redirect("category");
			}
		});
	}
}