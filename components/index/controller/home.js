// all the home route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const logger = require(__dirname + "../../../../middleware/logger");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
	try {
		_get.AllProduct((err, products) => {
			if (err) {
				console.log(":::", err);
			} else {
				_get.Pages((err, page) => {
					if (err) {
						console.error(":::", err);
					} else {
						res.render("layouts/index", {
							home: page.home,
							name: page.home.name,
							website: page.website,
							products: products,
							login: req.isAuthenticated(),
							user: req.user,
							bird: _bird.fly
						});
					}
				});
			}
		});
	} catch (err) {
		console.error("::::::>>:", err);
		_bird.message("danger", err);
		error500(req, res);
	}
}