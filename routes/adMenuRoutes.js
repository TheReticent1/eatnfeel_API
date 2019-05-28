"use strict";
const addMenuRoutes = (req, res, addMenu, mongoose) => {
  const { name, description,labels, price, food_type } = req.body;
  const addMenus = new addMenu({
    _id: mongoose.Types.ObjectId(),
    name: name,
    description: description,
    labels:labels,
    price: price,
    food_type: food_type
  });
  addMenus
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addMenuRoutes
};
