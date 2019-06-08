const signUp = require("../models/signUpModel");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
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

// mapping admin users as a profile by creating adminById method
exports.userById = (req, res, next, id) => {
  signUp.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found"
      });
    }
    req.profile = user;
    next();
  });
};

exports.allUsers = (req, res) => {
  signUp
    .find((err, users) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json({ users });
    })
    .select("name email updated created");
};

//get user
exports.getUser = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

//update user
exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); //extend object muted scource object
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action"
      });
    }
    user.password = undefined;
    res.json({ user });
  });
};