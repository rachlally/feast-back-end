const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Kitchen extends Model {}

Kitchen.init(
  {
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Kitchen;
