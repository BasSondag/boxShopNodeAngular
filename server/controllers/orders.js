var models = require('../models/index');
var Sequelize = require('sequelize');

module.exports = (function() {
	return {

		create: function (req, res) {
			let productsIds = []
			for (var i =0; i < req.body.items.length; i++){
				productsIds.push(req.body.items[i].id)

			}
			models.Order.create({
				isShipped: false
			}).then(function(order) {
				for (var i =0; i < req.body.items.length; i++){

					models.Order_product.create({
						OrderId: order.id,
	    				ProductId: req.body.items[i].id
					})
				}
				return res.json({succses: true, order: order});	
			}).catch(function(err) {
				return res.status(400).send(err)
			})
		},

		index: function(req, res) {
			models.Order.findAll({
    			include: [{
        			model: models.Product,
        			as: 'Product'
    			}]   			
			})
			.then( orders => {
				res.json({orders: orders });
			})
			.catch(function(err) {
				return res.status(400).send(err);
			})
		}

		

	}
})();