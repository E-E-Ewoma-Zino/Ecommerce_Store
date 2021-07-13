// the 500 errors route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        res.render("layouts/500", {
            user: req.user,
            bird: _bird.fly,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            login: req.isAuthenticated(),
            website: _get.Pages().website,
            name: `500 - Internal server error!`,
        });
    } catch (err) {
        console.error(":::", err);
    }
}
