'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    quantaty: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  Product.associate = function(models) {
    Product.belongsToMany(models.Order, {
      through: 'Order_product',
      as: 'Order' 
    });
  };
  return Product;
};

