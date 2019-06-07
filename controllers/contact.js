const mobiles = require("../models/mobileModel");
const address = require("../models/addressModel");

exports.addMobile = (req, res) => {
  const { mobile } = req.body;
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
        const mobileno = new mobiles(req.body);
        //save to database
        mobileno.save()
          .then(mob => {
            console.log(mob);
            res.status(200).json(mob);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    })
    .catch(errors => {
      console.log(errors);
      res.status(500).json(errors);
    });
};

exports.getMobile = (req, res) => {
  const id = req.params.userId;
  mobiles.find({
    userId: id
  })
    .select("userId mobile")
    .exec()
    .then(result => {
      if (result.length >= 1) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json("no record found");
      }
    })
    .catch(error => {
      res.status(400).json(error)
    });
}

exports.updateMobile = (req, res) => {
  const { _id, userId, mobile } = req.body;
  mobiles
    .updateOne({ _id, userId }, { mobile })
    .exec()
    .then(result => {
      if (result["ok"]) {
        res.json("Mobile no updated");
      } else {
        res.json("not updated");
      }
    })
    .catch(error => {
      if(error["code"]){
        res.json("number already present");
      }
      res.json(error);
    });
}

exports.addAddress = (req, res) => {
  //adding new address
  const addAddress = new address(req.body);
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
};

exports.getAddresses = (req, res) => {
  const id = req.params.userId;
  address.find({
    userId: id
  })
    .select("userId addressArea completeAddress addressType")
    .exec()
    .then(result => {
      if (result.length >= 1) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json("no record found");
      }
    })
    .catch(error => {
      res.status(400).json(error)
    });
}

exports.updateAddress = (req, res) => {
  const { _id, userId, addressArea, completeAddress, addressType } = req.body;
  address.updateOne({_id,userId},{addressArea,completeAddress,addressType})
  .exec()
  .then(result=>{
    if(result["ok"]){
      res.json("address updated successfully");
    }else{
      res.json("not updated");
    }
  })
  .catch(error=>{
    res.json(error);
  })
}