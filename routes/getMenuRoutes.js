"use strict";
const getMenuRoute = (req, res, getMenu) => {
  getMenu
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
};
module.exports = { getMenuRoute };
