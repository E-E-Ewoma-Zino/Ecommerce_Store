// all the admin logIn route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");

module.exports = {
    get(req, res) {
        try {
            res.render("admin/login", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `Admin LogIn`,
                breadcrumb: `Home - Admin - Login`,
                userEmail: ""
            });
        } catch (err) {
            _bird.message("danger", err);
            console.error(":::", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                bird: _bird.fly
            });
        }
    }
}
