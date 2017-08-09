'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len: [2,25]
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len: [2,25]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: function (value, next) {
          var self = this;
          User.find({where: {email: value}})
            .then(function (user) {
                // reject if a different user wants to use the same email
                if (user && self.id !== user.id) {
                    return next('Email already in use!');
                }
                return next();
            })
            .catch(function (err) {
                return next(err);
            });
          }
      },
      unique:{
        args: true,
        msg: "User with that email already exists"
      },
      len:[2,50]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[10,10]
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {    
    hooks: {
      beforeCreate: (password, options) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }

    }
  });
  return User;
};