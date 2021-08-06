// all the contact route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
	try {
		_get.Pages((err, page) => {
			if (err) {
				console.error(":::", err);
			} else {
				res.render("layouts/contact", {
					website: page.website,
					login: req.isAuthenticated(),
					user: req.user,
					bird: _bird.fly,
					name: page.contact.name,
					breadcrumb: page.contact.breadcrumb,
					contact: page.contact.contact
				});
			}
		});
	} catch (err) {
		console.error(":::", err);
		_bird.message("danger", err);
		error500(req, res);
	}
}