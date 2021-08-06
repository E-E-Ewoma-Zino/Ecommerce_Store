// all the order details dashboard route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _order = require(__dirname + "../../../../middleware/orders");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const logger = require(__dirname + "../../../../middleware/logger");

module.exports = {
	get(req, res) {
		try {
			// ci is just for people not to easily know my orderId
			logger.log(req.query.ci);
			const orderId = req.query.ci;

			_order.byId(orderId, (err, order) => {
				if (err) {
					console.error(":::", err);
				}
				else {
					res.render("admin/orderDetails", {
						bird: _bird.fly,
						order: order
					});
					// res.send(order);
				}
			});
		} catch (err) {
			_bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	}
}
