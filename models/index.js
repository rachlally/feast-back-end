const User = require('./User');
const Kitchen = require('./Kitchen');
const Storage = require('./Storage');
const Product = require('./Product');
const DonationList = require('./DonationList');
const ShoppingList = require('./ShoppingList');


User.hasMany(Kitchen);
Kitchen.belongsTo(User);

Kitchen.hasOne(DonationList);
DonationList.belongsTo(Kitchen);

Kitchen.hasOne(ShoppingList);
ShoppingList.belongsTo(Kitchen);

Kitchen.hasMany(Storage);
Storage.belongsTo(Kitchen);

Storage.hasMany(Product);
Product.belongsTo(Storage);

ShoppingList.hasMany(Product);
Product.belongsTo(ShoppingList);

DonationList.hasMany(Product);
Product.belongsTo(DonationList);


module.exports = {
    User, Kitchen, Storage, Product, DonationList, ShoppingList
  };