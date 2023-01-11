const router = require("express").Router();

const {
  Kitchen,
  User,
  Storage,
  DonationList,
  ShoppingList,
} = require("../../models");

//get all kitchens
router.get("/", async (req, res) => {
  try {
    const kitchen = await Kitchen.findAll({
      include: [User, Storage, DonationList, ShoppingList],
    });
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get all kitchens by userID
router.get("/user/:UserId", async (req, res) => {
  try {
    const kitchen = await Kitchen.findAll({
      where: {
        $UserId$: req.params.UserId,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Storage,
          attributes: ["id", "storageType"],
        },
        {
          model: ShoppingList,
          attributes: ["id", "name"],
        },
        {
          model: DonationList,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//get one kitchen
router.get("/:id", async (req, res) => {
  try {
    const kitchen = await Kitchen.findByPk(req.params.id, {
      include: [User, Storage, ShoppingList, DonationList],
    });
    if (!kitchen) {
      res.status(404).json({ message: "No kitchen found with that ID!" });
      return;
    }
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create a kithen
//need to add user
router.post("/", async (req, res) => {
  try {
    const kitchen = await Kitchen.create(req.body);
    const newShoppingList = await ShoppingList.create({
      name:
        kitchen.name[kitchen.name.length - 1] === "s"
          ? `${kitchen.name}' Shopping List`
          : `${kitchen.name}'s Shopping List`,
      KitchenId: kitchen.id,
    });

    const newDonationList = await DonationList.create({
      name:
        kitchen.name[kitchen.name.length - 1] === "s"
          ? `${kitchen.name}' Donation List`
          : `${kitchen.name}'s Donation List`,
      KitchenId: kitchen.id,
    });
    res.status(200).json({
      kitchen: kitchen,
      shoppingList: newShoppingList,
      donationList: newDonationList,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "The kitchen you are creating does not have a valid user ID associated with it",
    });
  }
});

//update a kitchen
router.put("/:id", async (req, res) => {
  try {
    const kitchen = await Kitchen.update({
      name:req.body.name,
      zipCode:req.body.zipCode
    },{
      where: {
        id: req.params.id,
      },
      include: [User, ShoppingList, DonationList],
    });
    console.log(JSON.stringify(kitchen))
    const newShoppingList = await ShoppingList.update({
      name:
        kitchen.name[kitchen.name.length - 1] === "s"
          ? `${kitchen.name}' Shopping List`
          : `${kitchen.name}'s Shopping List`,
      KitchenId: kitchen.id,
    });

    const newDonationList = await DonationList.update({
      name:
        kitchen.name[kitchen.name.length - 1] === "s"
          ? `${kitchen.name}' Donation List`
          : `${kitchen.name}'s Donation List`,
      KitchenId: kitchen.id,
    });
    res.status(200).json({
      kitchen: kitchen,
      shoppingList: newShoppingList,
      donationList: newDonationList,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "The kitchen you are creating does not have a valid user ID associated with it",
    });
  }
});

//delete kitchen
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const kitchen = await Kitchen.destroy({ where: { id: req.params.id } });
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "There is no kitchen with that ID" });
  }
});

module.exports = router;
