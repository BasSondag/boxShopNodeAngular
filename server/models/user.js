'use strict';

const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


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
                    return next('Email is already taken!');
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
      beforeValidate: function(user, options) {

        if (!user.changed('password')) {
          return sequelize.Promise.reject("password not modified");
        }

        return bcrypt.genSaltAsync(8).then(function(salt) {
          return bcrypt.hashAsync(user.password, salt, null);
        }).then(function(hash) {
          user.setDataValue('password', hash);
        }).catch(function(err) {
          return sequelize.Promise.reject(err);
        });
      }

    }
  });
  return User;
};