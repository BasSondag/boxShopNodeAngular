var models = require('../models/index');
var Sequelize = require('sequelize');
var myStripeKey= require('./../config/config.json')["myStripeKey"]
var stripe = require("stripe")(myStripeKey);

module.exports = (function() {
	return {
		
		create: function (req, res) {
			let productsIds = [];
			
			for (var i =0; i < req.body.order.items.length; i++){
				if ( req.body.order.items[i].qauntaty === 1) {
					productsIds.push(req.body.order.items[i].id)
				} else {
					while (req.body.order.items[i].quantaty > 0 ) {
						productsIds.push(req.body.order.items[i].id)
						req.body.order.items[i].quantaty -= 1;
					}
				}
			}

			models.Product.findAll({
				where: {
					id: productsIds
				}
			})
			.then( product => {
				var products = new Map()
				var productPrice = 0;
				for (Product in product){
					products.set(product[Product].dataValues.id, product[Product].dataValues)
				}
				for (var i=0;i<productsIds.length;i++) {
					productPrice += products.get(productsIds[i]).price
				}
				if (productPrice === req.body.order.total){
					// Token is created using Checkout or Elements!
					// Get the payment token ID submitted by the form:
					productPrice *= 100
					var token = req.body.token.id; // Using Expresspr
					// Charge the user's card:
					stripe.charges.create({
						amount: productPrice,
						currency: "usd",
						description: "Example charge",
						source: token,
					}, function(err, charge) {
						// asynchronously called
						if(err) {
							return res.status(400).send(err);
						}
						if(charge) {
							console.log(productsIds )
							models.Order.create({
								isShipped: false
							}).then(function(order) {
								for (var i =0; i < productsIds.length; i++){

									models.Order_product.create({
										OrderId: order.id,
					    				ProductId: productsIds[i]
									})
								}
								return res.json({succses: true, order: order});	
							}).catch(function(err) {
								return res.status(400).send(err)
							})
			 			}
					});
				}else {
					let err = "sommething whent wrong with the total order price, we will contact you or contact us"
					return res.status(400).send(err)
				}
			})	
			.catch(function(err) {
			console.log(err)
			return err;
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

	function getProduct (ids) {
		console.log(ids, 'ZzZZZZZZZZZZ')
		models.Product.findAll({
			where: {
				id: ids
			}
		})
		.then( product => {
			var products = new Map()
			var productPrice = 0;
			for (Product in product){
				console.log(product[Product].dataValues)

				products.set(product[Product].dataValues.id, product[Product].dataValues)
			}
			for (var i=0;i<ids.length;i++) {
				productPrice += products.get(ids[i]).price
			}
			console.log(products, productPrice)

			return productPrice
		})
		.catch(function(err) {
			console.log(err)
			return err;
		})
		
	} 
})();