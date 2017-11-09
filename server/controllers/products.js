var models = require('../models/index');
var Sequelize = require('sequelize');

module.exports = (function() {
	return {

		index: function (req, res) {
			models.Product.all()
			.then(products => {
				res.json({products:products});
			})
			.catch(function(err) {
				return res.status(400).send(err);
			})

		},

		create: function(req, res) {
			models.Product.create({
				title: req.body.title,
				description: req.body.description,
				price: req.body.price,
				quantaty: req.body.quantaty,
				img: req.body.imageUrl
			}).then(function(item) {
                res.json({success: true, errors: null, item:item});
            }).catch(Sequelize.ValidationError, function (err) {
	            // respond with validation errors
	            console.log(err.errors)
             	res.status(422).json(err.errors);
            }).catch(function(err) {
                //Catches Errors
                return res.status(400).send(err);
            })
		},

		update: function(req, res) {
			models.Product.update(
	   			req.body,
				{where:{id: req.body.id}}
			)
			.then( product => {
				res.json({success: true, errors: null, item: product[0]}) 
			})
			.catch(function(err) {
				return res.status(400).send(err)

			})
		},

		delete: function(req, res) {
			var self = this;
            // Find user, find and delete user's supports, then delete user
            models.Product.findOne({where: {id:  req.body.id}})
            .then(function(product){
                 product.destroy()
                .then(function(){
                    // Send back all remaining users
                    self.index(req, res)
                })
             })
            .catch(function(err) {
            	return res.status(400).send(err);
            })
		}
	}
})(); 