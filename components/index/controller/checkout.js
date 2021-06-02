// all the checkout route code goes here
const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");


module.exports = {
    get(req, res) {
        try {
            res.render("layouts/checkout", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                message: messageBird.fly,
                name: _get.Pages().checkout.name,
                breadcrumb: _get.Pages().checkout.breadcrumb
            });

        } catch (err) {
            console.error(":::", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                message: messageBird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct(),
                msg: err
            });
        }
    },
    post() {
        // for later
    }
}
