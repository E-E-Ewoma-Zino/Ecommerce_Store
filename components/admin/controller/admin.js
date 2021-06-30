// all the admin route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        res.redirect("admin/login");
    } catch (err) {
        console.error("::::::>>:", err);
        _bird.message("danger", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            bird: _bird.fly,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
        });
    }
}