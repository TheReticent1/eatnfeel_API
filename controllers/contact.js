const mobiles = require("../models/mobileModel");
const address = require("../models/addressModel");
const _ = require("lodash");

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

// find addresses info by id
exports.addressById = (req, res, next, id) => {
  address.findById(id).exec((err, address) => {
    if (err || !address) {
      return res.status(400).json({
        error: "address not found"
      });
    }
    req.address = address;
    next();
  });
};

// update address info
exports.updateAddress = (req, res, next) => {
  let address = req.address;
  address = _.extend(address, req.body); //extend object muted scource object
  address.updated = Date.now();
  address.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action"
      });
    }

    res.json({ address });
  });
};

// find mobile contact info by id
exports.mobileById = (req, res, next, id) => {
  mobiles.findById(id).exec((err, mobile) => {
    if (err || !mobile) {
      return res.status(400).json({
        error: "address not found"
      });
    }
    req.mobile = mobile;
    next();
  });
};

// update mobile contact.
exports.updateMobile = (req, res, next) => {
  let mobile = req.mobile;
  mobile = _.extend(mobile, req.body);
  mobile.updated = Date.now();
  mobile.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action"
      });
    }
    res.json({ mobile });
  });
};