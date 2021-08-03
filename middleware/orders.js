// middleware for orders
const Orders = require("../model/Orders");

module.exports = {
	all: (callback)=>{
		Orders.find({}).populate({path: "user", select:["firstname"]}).exec((err, orders)=>{
			if(err){
				console.log(":::", err);
				callback(err, null);
			}
			else{
				callback(null, orders);
			}
		});
	}
}