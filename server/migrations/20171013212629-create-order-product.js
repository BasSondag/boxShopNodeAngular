'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Order_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Orders',
            key: 'id'
          }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('order_products');
  }
};