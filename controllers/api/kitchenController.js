const router = require("express").Router();

const { Kitchen, User, Storage } = require("../../models");

//get all kitchens
router.get("/", async (req, res) => {
  try {
    const kitchen = await Kitchen.findAll({
      include: [User, Storage],
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
      include: [User, Storage],
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
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        msg: "The kitchen you are creating does not have a valid user ID associated with it",
      });
  }
});

//update a kitchen
router.put("/:id", async (req, res) => {
  try {
    const kitchen = await Kitchen.update(req.body, {
      where: { id: req.params.id },
      include: [User],
    });
    res.status(200).json(kitchen);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
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
