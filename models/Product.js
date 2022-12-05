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
      allowNull:false
    },
    datePurchased: {
      type: DataTypes.DATEONLY,
      allowNull:false,
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