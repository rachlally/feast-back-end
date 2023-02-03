const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Kitchen extends Model {}

Kitchen.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Kitchen;
