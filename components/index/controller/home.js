// all the home route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const logger = require(__dirname + "../../../../middleware/logger");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        res.render("layouts/index", {
            home: _get.Pages().home,
            name: _get.Pages().home.name,
            website: _get.Pages().website,
            products: _get.AllProduct(),
            login: req.isAuthenticated(),
            user: req.user,
            bird: _bird.fly
        });


    } catch (err) {
        console.error("::::::>>:", err);
        _bird.message("danger", err);
        error500(req, res);
    }
}