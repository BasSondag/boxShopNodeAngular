var models = require('../models/index');
var Sequelize = require('sequelize');

module.exports = (function() {
	return {
		create: function(req, res) {
			models.User.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: req.body.password,
				admin: false
			}).then(function(user) {
                //Does this after creating
                res.json({success: true, errors: null, user:user});
            }).catch(Sequelize.ValidationError, function (err) {
	            // respond with validation errors
	            console.log(err.errors)
             	res.status(422).json(err.errors);
            }).catch(function(err) {
                //Catches Errors
                return res.status(400).send(err);
            })
		},

		update: function(req, res, next) {
			console.log("foundUser", req.body)
			// models.User.update({  
			// 	  id: req.body.id
			// 	})
			// 	.then(user => {
			// 		console.log(user.D)
			// 	  	return user.updateAttributes(req.body);
			// 	})
			// 	.then (updatedUser => {
			// 		res.json(updatedUser);
			// 	})

			models.User.update(
	   			req.body,
				{where:{id: req.body.id}}
			)
			.then( user => {
				console.log("in user controntroller  updating ", user)
				res.json({success: true, errors: null, user: user[0]}) 
			})
			.catch(function(err) {
				console.log(err)
				return res.status(400).send(err)

			})
		}
			
				
	}
})();