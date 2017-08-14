var users = require('../controllers/users.js');
var passport = require("passport");


module.exports= function(app) {

//###########################################################################
   
    /// Users controller
	app.post('/users', function(req, res) {
		users.create(req, res);
	})
//###########################################################################
    
    /// Passport 
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-signin', function(err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function(err) {
                console.log(user)
                if(user === false) {
                    var err = "Email or Password is not correct "
                    return res.status(422). json(err)
                }
                return res.json(user);
            });
        })(req, res, next);
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.send('Logout Ok');
    });

    app.get('/checkLogin', isLoggedIn, function(req, res){
        res.json(req.user);
    });

    app.get('/profile', isLoggedIn, function(req, res){
        res.redirect('/');
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