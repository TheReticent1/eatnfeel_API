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
    .select("_id name description labels price food_type")
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

exports.updateMenu = (req, res) => {
  const { _id, name, description, labels, price, food_type } = req.body;
  menu.updateOne({ _id }, { name, description, labels, price, food_type })
    .exec()
    .then(result => {
      if (result["ok"]) {
        res.json("menu updated successfully");
      } else {
        res.json("not updated");
      }
    })
    .catch(error => {
      res.json(error);
    })
}

exports.deleteMenu = (req, res) => {
  const _id = req.params._id;
  menu
    .remove({ _id })
    .exec()
    .then(result => {
      if(result["ok"]){
        res.json("Menu deleted successfully");
      }else{
        res.json("Sorry, try again later");
      }
    })
    .catch(error => {
      res.json(error);
    });
}