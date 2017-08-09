'use strict';
var bcrypt = require('bcrypt-nodejs')
var models = require('../../server/models');
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        first_name: 'User1',
        last_name: 'LAST1',
        email: 'test@test.com',
        password: bcrypt.hashSync("12Sokken!", bcrypt.genSaltSync(8), null),
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User2',
        last_name: 'last2',
        email: 'test2@test2.com',
        password: bcrypt.hashSync("12Sokken!", bcrypt.genSaltSync(8), null),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User3',
        last_name: 'last3',
        email: 'test3@test3.com',
        password: bcrypt.hashSync("12Sokken!", bcrypt.genSaltSync(8), null),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User4',
        last_name: 'last4',
        email: 'test4@test4.com',
        password: bcrypt.hashSync("12Sokken!", bcrypt.genSaltSync(8), null),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
