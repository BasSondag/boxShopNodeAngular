var bcrypt = require('bcrypt-nodejs');
var models = require('../../models')
module.exports =function(passport) {
    var User = models.User;
    var LocacStrategy = require('passport-local').Strategy;

    //######## SESSIONS              #########################################
    //serialize
    passport.serializeUser(function(user, done) {
        console.log('in serializeUser')
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
        User.findOne({where: {id: id}}).then(function(user) {
            console.log("in deserialize")
            if (user) {
                console.log(user.get())
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });  
    });
    //######## LOCAL SINGUP          #########################################

    //######## LOCAL LOGIN           #########################################

    passport.use('local-signin', new LocalStrategy({

      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {

        var User = models.User;

        var isValidPassword = function(userpass,password){
          return bcrypt.compareSync(password, userpass);
        }

        User.findOne({ where : { email: email}}).then(function (user) {

          if (!user) {
            return done(null, false, { message: 'Email does not exist' });
          }

          if (!isValidPassword(user.password,password)) {

            return done(null, false, { message: 'Incorrect password.' });

          }

          var userinfo = user.get();

          return done(null,userinfo);

        }).catch(function(err){

          console.log("Error:",err);

          return done(null, false, { message: 'Something went wrong with your Signin' });


        });

      }
  ));

}
