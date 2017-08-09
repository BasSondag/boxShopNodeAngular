var users = require('../controllers/users.js');
module.exports= function(app) {
	app.post('/users', function(req, res) {
		users.create(req, res);
	})
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log('IS AUTHENTICATED BEEP BOOP');
        console.log(req.user);
        return next();
    }

    // if they aren't redirect them to the home page
    return res.redirect('/');
};