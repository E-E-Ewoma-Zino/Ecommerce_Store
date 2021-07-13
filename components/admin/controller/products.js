// all the product dashboard route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");

module.exports = {
    get(req, res) {
        try {
            res.render("admin/products", {
                products: _get.AllProduct(),
                bird: _bird.fly
            });
        } catch (err) {
            _bird.message("danger", err);
            console.error(":::", err);
            error500(req, res);
        }
    }
}
