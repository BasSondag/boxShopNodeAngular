'use strict';
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
    return queryInterface.bulkInsert('Products', [{
        title: 'blue glasses',
        description: 'this glassse is blue',
        price: 50,
        quantaty: 100,
        img: "sufgisgfiwfiw",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'green glasses',
        description: 'this glassse is green',
        price: 50,
        quantaty: 100,
        img: "sufgisgfiwfiw",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'yellow glasses',
        description: 'this glassse is yellow',
        price: 50,
        quantaty: 100,
        img: "sufgisgfiwfiw",
        createdAt: new Date(),
        updatedAt: new Date()

      },{
        title: 'red glasses',
        description: 'this glassse is red',
        price: 50,
        quantaty: 100,
        img: "sufgisgfiwfiw",
        createdAt: new Date(),
        updatedAt: new Date()

      }],
      {});
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
