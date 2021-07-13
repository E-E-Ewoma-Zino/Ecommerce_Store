// all the 404 errors route code goes here
const error500 = require(__dirname + "/500");
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        res.render("layouts/404", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
            bird: _bird.fly,
            name: `404 - Can't find "${req.originalUrl}"`,
            breadcrumb: `home - ❓`,
            product: _get.AllProduct()
        });
    } catch (err) {
        console.error(":::", err);
        _bird.message("danger", err);
        error500(req, res);
    }
}
