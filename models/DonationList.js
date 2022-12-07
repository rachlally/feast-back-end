const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class DonationList extends Model {}

DonationList.init(
  {


    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    

  },
  { sequelize }
);

module.exports = DonationList;