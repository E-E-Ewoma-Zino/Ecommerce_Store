// all the product dashboard route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const Products = require(__dirname + "../../../../model/Products");
const logger = require(__dirname + "../../../../middleware/logger");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");

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
	},
	delete: (req, res)=>{
		console.log(req.query);
		Products.deleteOne({_id: req.query.q}, (err)=>{
			if(err){
				console.log("err:::", err);
				res.sendStatus(500).json();
				return;
			}
			res.send("Deleted " + req.query.q);
		});
	}
}
