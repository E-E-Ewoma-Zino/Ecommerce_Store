// all the admin route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        res.redirect("admin/login");
    } catch (err) {
        console.error("::::::>>:", err);
        _bird.message("danger", err);
        error500(req, res);
    }
}