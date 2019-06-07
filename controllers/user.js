const signUp = require("../models/signUpModel");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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
          .then(result1 => {
            // token generation
            //payload
            var token = jwt.sign({
              email: result1[0].email,
              userId: result1[0]._id
            },
              //secret key
              process.env.USER_KEY,
              //key expires in
              {
                expiresIn: "1h"
              });
            return res.status(200).json({
              result: result1,
              token: token
            });
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

exports.updateUser = (req, res) => {
  const { _id, name, email, password, newPassword } = req.body;
  signUp
    .find({ _id }, { password: 1 })
    .exec()
    .then(result => {
      const hash = result[0].password;
      const pass = bcrypt.compareSync(password, hash);
      const newPass = bcrypt.hashSync(newPassword);
      if (pass) {
        signUp.updateOne({ _id }, { name, email, password: newPass })
        .exec()
        .then(result=>{
          if(result["ok"]){
            res.json("Updated Successfully");
          }else {
            res.json("Not updated");
          }
        })
        .catch(error=>{
          res.json(error);
        })
      }else{
        res.json("password not matched");
      }
    })
    .catch(err => {
      res.json(err);
    })
}