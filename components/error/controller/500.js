// the 500 errors route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res) => {
    try {
        _get.Pages((err, page)=>{
            if (err) {
                console.error(":::", err);
            }else{
                res.render("layouts/500", {
                    user: req.user,
                    bird: _bird.fly,
                    breadcrumb: `❌🤦‍♂️`,
                    login: req.isAuthenticated(),
                    website: page.website,
                    name: `500 - Internal server error!`,
                });
            }
        });
    } catch (err) {
        console.error(":::", err);
    }
}
