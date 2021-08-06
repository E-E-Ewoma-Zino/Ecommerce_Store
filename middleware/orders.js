// middleware for orders
const Orders = require("../model/Orders");

module.exports = {
	all: (callback)=>{
		Orders.find({}).populate({
			path: "user cart",
			select: ["firstname"],
			populate: {
				path: "item",
				populate: {
					path: "product",
					select: ["name"]
				}
			}
		}).exec((err, orders)=>{
			if(err){
				console.error(":::", err);
				callback(err, null);
			}
			else{
				callback(null, orders);
			}
		});
	},
	// find orders by ID's
	byId: (orderId, callback)=>{
		Orders.findById({_id: orderId}).populate({
			path: "user cart",
			populate: {
				path: "item",
				populate: {
					path: "product",
				}
			}
		}).exec((err, order)=>{
			if(err){
				console.error(":::", err);
				callback(err, null);
			}
			else{
				callback(null, order);
			}
		});
	}
}