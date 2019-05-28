"use strict";
//import validation file
const {mobileValidation} = require('../validation');

const mobileRoutes = (req, res, mongoose, mobiles) => {
  const { userId, mobile } = req.body;

  //check validation
  const { error } = mobileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  mobiles
    .findOne({
      mobile
    })
    .exec()
    .then(result => {
      //check number exist or not
      if (result) {
        res.status(400).json("mobile number already registered");
      } else {
        //add new number
        const mobileno = new mobiles({
          _id: mongoose.Types.ObjectId(),
          userId: userId,
          mobile: mobile
        });
        //save to database
        mobileno.save()
          .then(mob => {
            console.log(mob);
            res.status(200).json(mob);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          })
      }
    })
    .catch(errors => {
      console.log(errors);
      res.status(500).json(errors);
    })
}

module.exports = { mobileRoutes };