const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      //incase we need cloudinary
    //   host: '127.0.0.1'
      dialect: 'mysql',
      port: 3306
    }
  );
}

//in case we need cloudnary
// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUDAPIKEY,
//   api_secret: process.env.CLOUDINARYSECRET,
//   secure: true,
// })

module.exports = sequelize;