'use strict';
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    isShipped: DataTypes.BOOLEAN,
  });

  Order.associate = function (models) {
 		Order.belongsToMany(models.Product, {
			through: 'Order_products',
			as: 'Product'
	  });
	};

  return Order;
};