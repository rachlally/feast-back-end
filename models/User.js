const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection.js");

class User extends Model {}

User.init(
    {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate: {len:[5]}
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate: {isEmail: true}
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {len:[8]}
  },
},
{sequelize,
    hooks: {
      beforeCreate: function(userObj) {
        userObj.password=bcrypt.hashSync(userObj.password, 5)
        return userObj;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    },
  }
}
);

module.exports=User;