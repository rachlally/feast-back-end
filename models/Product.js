const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPerishable: {
      type: DataTypes.BOOLEAN,
      allowNull:true
    },
    datePurchased: {
      type: DataTypes.DATEONLY,
      allowNull:true,
      validate: {isDate:true}
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      validate: {isDate:true}
    },
    

  },
  { sequelize }
);

module.exports = Product;