const menu = require("../models/menuModel");
const _ = require("lodash");

exports.addMenu = (req, res) => {
  const { name, description, labels, price, food_type } = req.body;
  const Menu = new menu({
    name,
    description,
    labels,
    price,
    food_type,
    imgPath: req.file.path
  });
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
    .select("_id name description labels price food_type imgPath")
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

//Getting menus by Id
exports.menuById = (req, res, next, id) => {
  menu.findById(id).exec((err, menu) => {
    if (err || !menu) {
      return res.status(400).json({
        error: "user not found"
      });
    }
    req.menus = menu;
    next();
  });
};

//update menus
exports.updateMenu = (req, res, next) => {
  const { name, description, labels, price, food_type } = req.body;
  let menu = req.menus;
  menu = _.extend(menu, { name, description, labels, price, food_type, imgPath: req.file.path });
  menu.updated = Date.now();
  menu.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action"
      });
    }
    res.json({ menu });
  });
};

//delete menu
exports.deleteMenu = (req, res, next) => {
  let menu = req.menus;
  menu.remove((err, user) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }

    res.json({ message: "Menu deleted successfully" });
  });
};