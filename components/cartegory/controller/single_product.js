// all the category/: code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");

module.exports = (req, res) => {

	_get.ProductByID(req.params.id, (product) => {
		try {
			_get.Pages((err, page)=>{
				if (err) {
					console.error(":::", err);
				}else{
					res.render("layouts/Single-product", {
						website: page.website,
						login: req.isAuthenticated(),
						user: req.user,
						bird: _bird.fly,
						name: page.single.name,
						breadcrumb: page.single.breadcrumb,
						product: product
					});
				}
			});
		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	});
}