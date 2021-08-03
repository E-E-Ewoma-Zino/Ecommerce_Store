// all the order tracking dashboard route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _order = require(__dirname + "../../../../middleware/orders");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");

module.exports = {
	get(req, res) {
		try {
			_order.all((err, orders) => {
				if (err) {
					console.log(":::", err);
				}
				else {
					res.render("admin/orderTracking", {
						bird: _bird.fly,
						orders: orders
					});
					// res.send(orders);
				}
			});
		} catch (err) {
			_bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	}
}
