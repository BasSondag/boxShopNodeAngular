'use strict';
module.exports = function(sequelize, DataTypes) {
  var order_product = sequelize.define('Order_product', {
    orderId: DataTypes.INTEGER,
    productId:  DataTypes.INTEGER
  });

  return order_product;
};