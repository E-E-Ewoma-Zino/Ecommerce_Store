const Category = require(__dirname + "../../../../model/Category");
const _cat = require(__dirname + "../../../../middleware/category");

module.exports = {
    get(req, res) {
        try {
            _cat.sortAndPopulate((err, all)=>{
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(all);
                }
            });

        } catch (err) {
            console.error(":::::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct()
            });
        }
    },
    post: function (req, res) {

        try {
            console.log(req.body);

            const newCategory = new Category({
                name: req.body.name,
                product: req.body.product,
                parents: req.body.parent
            });

            console.log(newCategory.parents);
            // if newCategory has a parent then it should:
            // 1. be a child of the parent
            // 2. contain all the parents from father to Adam
            if (newCategory.parents.length) {
                console.log("It has a parent");
                _cat.newChild(newCategory);
                // 
                _cat.newParent(newCategory, () => {
                    res.redirect("back");
                });
            } else {
                console.log("It has No parent");
                newCategory.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.redirect("back");
                    }
                });
            }

        } catch (err) {
            console.error(":::::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct()
            });
        }
    }
}