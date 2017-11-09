var users = require('../controllers/users.js');
var passport = require("passport");
var products = require('../controllers/products');
var orders = require('../controllers/orders.js')
var path = require('path');


module.exports= function(app) {

//###########################################################################
   
    /// Users controller
	app.post('/users', function(req, res) {
		users.create(req, res);
	});
    app.post('/updateUser', isAuthenticated, function(req, res, next) {
        users.update(req, res)
    });
//###########################################################################
    
    /// Passport 
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-signin', function(err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function(err) {
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

    app.get('/checkLogin', isAuthenticated, function(req, res){
        console.log("checking the user in session")
        res.json(req.user);
    });

    app.get('/profile', isAuthenticated, function(req, res){
        res.redirect('/');
    });

   

//###########################################################################
    
    //Poducts controller

    app.get('/items', function(req, res) {
        products.index(req, res)
    });

    app.post('/items/create', isAuthenticated, needsAdmin(), function(req, res) {
        products.create(req, res)
    });

    app.post('/items/update', isAuthenticated, needsAdmin(), function(req, res) {
        products.update(req, res)
    });

    app.post('/items/delete', isAuthenticated, needsAdmin(), function(req, res) {
        products.delete(req, res)
    });

//###########################################################################
    //orders controller
    app.get('/orders',isAuthenticated, needsAdmin(), function(req, res) {
        orders.index(req, res)
    });

    app.post('/orders/create', function(req, res) {
        orders.create(req,res)
    });


//###########################################################################
    // for angular routers
     app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    })

};
//###########################################################################

// route middleware to make sure a user is logged in
function isAuthenticated(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log('IS AUTHENTICATED BEEP BOOP');
        return next();
    }

    // if they aren't redirect them to the home page
    return res.redirect('/');
};

// comfirm the addmin
var needsAdmin = function() {
  return function(req, res, next) {
    console.log(req.session.passport.user)
    if (req.user && req.user.admin === true && req.user.id === req.session.passport.user ){
        console.log('ADMIN CONFIRMED');
      next();
    }
    else {
      res.send(401, 'Unauthorized');
    }
  };
};





