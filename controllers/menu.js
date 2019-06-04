const menu = require("../models/menuModel");

exports.addMenu = (req, res) => {
  const Menu = new menu(req.body);
  Menu
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

exports.getMenu = (req, res) => {
  menu
  .find()
  .select("_id name description price food_type")
  .exec()
  .then(menu => {
    console.log(menu);
    res.status(200).json(menu);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
}