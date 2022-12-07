const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Storage extends Model {}

Storage.init(
  {

    storageType:{
        type: DataTypes.STRING,
        allowNull: false,

    },

  },
  { sequelize }
);

module.exports = Storage;