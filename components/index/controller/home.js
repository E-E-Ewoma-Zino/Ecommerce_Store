// all the home route code goes here
const _get = require("../../../middleware/get");
const logger = require("../../../middleware/logger");
const messageBird = require("../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        logger.logArg("wedfda", messageBird.fly);
        res.render("layouts/index", {
            home: _get.Pages().home,
            name: _get.Pages().home.name,
            website: _get.Pages().website,
            products: _get.AllProduct(),
            login: req.isAuthenticated(),
            user: req.user,
            message: messageBird.fly
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
}