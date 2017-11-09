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
             	res.status(422).json(err.errors);
            }).catch(function(err) {
                //Catches Errors
                return res.status(400).send(err);
            })
		},

		update: function(req, res, next) {
			models.User.update(
	   			req.body,
				{where:{id: req.body.id}}
			)
			.then( user => {
				res.json({success: true, errors: null, user: user[0]}) 
			})
			.catch(function(err) {
				return res.status(400).send(err)

			})
		}
			
				
	}
})();