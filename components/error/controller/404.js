// all the 404 errors route code goes here
const error500 = require(__dirname + "/500");
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
	try {
		_get.Pages((err, page)=>{
			if (err) {
				console.error(":::", err);
			}else{
				res.render("layouts/404", {
					website: page.website,
					login: req.isAuthenticated(),
					user: req.user,
					bird: _bird.fly,
					name: `404 - Can't find "${req.originalUrl}"`,
					breadcrumb: `home - ❓`,
				});
			}
		});
	} catch (err) {
		console.error(":::", err);
		_bird.message("danger", err);
		error500(req, res);
	}
}
