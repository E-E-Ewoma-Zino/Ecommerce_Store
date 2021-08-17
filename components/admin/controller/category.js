const _cat = require(__dirname + "../../../../middleware/category");
const _bird = require(__dirname + "../../../../middleware/messageBird");

module.exports = {
	get(req, res) {
		try {
			_cat.sortAndPopulate((err, all) => {
				if (err) {
					_bird.message("danger", err);
					res.render("admin/category", {
						categories: [],
						bird: _bird.fly
					});
				}
				else {
					res.render("admin/category", {
						categories: all,
						bird: _bird.fly
					});
				}
			});
		} catch (err) {
			console.error(":::::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	}
}