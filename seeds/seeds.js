const sequelize = require("../config/connection");
const {
  User,
  Kitchen,
  Storage,
  Product,
  DonationList,
  ShoppingList,
} = require("../models");

const userData = [
  {
    name: "Jack Sparrow",
    email: "jack@sparrow.com",
    password: "Iamthecaptain",
  },
    {
      name: "Bugs Bunny",
      email: "bug@bunny.com",
      password: "thisaintalbaquerque"
    },
    {
      name: "Harry Potter",
      email: "yourawizard@harry.com",
      password: "voldemort"
    },
];
const kitchenData = [
  {
    zipCode: 98027,
    UserId: 1,
  },
  // {
  //     zipCode: 98223,
  //     UserId: 2
  // },
  // {
  //     zipCode: 98672,
  //     UserId: 1
  // },
];
const storageData = [
  {
    storageType: "Pantry",
    KitchenId: 1,
  },
  {
    storageType: "Freezer",
    KitchenId: 1,
  },
  {
    storageType: "Refrigerator",
    KitchenId: 1,
  },
];
const productData = [
  {
    name: "Pickles",
    isPerishable: false,
    datePurchased: "2022-12-05",
    expirationDate: "2023-09-05",
    StorageId: 3,
    ShoppingListId: 2,
    DonationListId: 1
  },
  {
    name: "Ben and Jerry's Phish Food",
    isPerishable: false,
    datePurchased: "2022-11-30",
    expirationDate: "2023-09-05",
    StorageId: 2,
    ShoppingListId: 2,
    DonationListId: 1
  },
  {
    name: "Marinara Sauce",
    isPerishable: true,
    datePurchased: "2022-09-05",
    expirationDate: "2023-09-05",
    StorageId: 1,
    ShoppingListId: 1,
    DonationListId: 1
  },
];

const donationListData = [
  {
    name: "Jack's donation list",
    UserId: 1,
  },
];

const shoppingListData = [
  {
    name: "Jack's list",
    UserId: 1,
  },
  {
    name: "Bug's list",
    UserId: 2,
  },
  {
    name: "Harry's list",
    UserId: 3,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const shoppingLists = await ShoppingList.bulkCreate(shoppingListData);
  const kitchens = await Kitchen.bulkCreate(kitchenData);
  const storage = await Storage.bulkCreate(storageData);
  const donationLists = await DonationList.bulkCreate(donationListData);
  const products = await Product.bulkCreate(productData);
};

seedDatabase();
