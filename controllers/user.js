const signUp = require("../models/signUpModel");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;
  //auto-gen a hash password
  const hash = bcrypt.hashSync(password);
  signUp
    .findOne({
      email
    })
    .exec()
    .then(result1 => {
      //check if the user exists
      if (result1) {
        res.status(400).json("User already Registered");
      } else {
        //create new user
        const signup = new signUp({
          _id: mongoose.Types.ObjectId(),
          name: name,
          email: email,
          password: hash,
          reg_date: new Date()
        });
        //save the user in the database
        signup
          .save()
          .then(result => {
            console.log(result);
            res.status(200).json("user register successfully");
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.signIn = (req, res) => {
  const { email } = req.body;
  signUp
    .find({ email }, { email: 1, password: 1 })
    .exec()
    .then(result => {
      const hash = result[0].password;
      const pass = bcrypt.compareSync(req.body.password, hash);
      if (pass) {
        signUp
          .find({ email }, { name: 1, email: 1 })
          .exec()
          .then(result => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      } else {
        res.status(400).json("invalid password");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("invalid credentials");
    });
};