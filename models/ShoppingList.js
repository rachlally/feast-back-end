const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class ShoppingList extends Model {}

ShoppingList.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  { sequelize }
);

module.exports = ShoppingList;