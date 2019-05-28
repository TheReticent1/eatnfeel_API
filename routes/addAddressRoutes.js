"use strict"
const {addressValidation} = require("../validation");

const addAddress = (req, res, mongoose, address) => {
  const { userId, addressArea, completeAddress, addressType } = req.body;

  //check validation
  const {error} = addressValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //adding new address
  const addAddress = new address({
    _id: mongoose.Types.ObjectId(),
    userId,
    addressArea,
    completeAddress,
    addressType
  });
  //save to database
  addAddress.save()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
}

module.exports = { addAddress };