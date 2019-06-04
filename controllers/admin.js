const admin = require("../models/adminModel");
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.signUp = (req, res) => {
  const { name, email, password, authKey } = req.body;
  //auto-gen a hash password
  const hash = bcrypt.hashSync(password);
  const resto = bcrypt.hashSync(authKey);
  //checking admin key to register as admin
  const skey = bcrypt.compareSync(process.env.ADMIN_KEY, resto);
  admin.findOne({
    email
  })
    .exec()
    .then(result1 => {
      //check if the user exists
      if (result1) {
        res.status(400).json("Already Registered");
      } else {
        //create new user    
        if (skey) {
          const signup = new admin({
            name: name,
            email: email,
            password: hash,
            authKey: resto,
            regDate: new Date()
          });
          //save the user in the database
          signup
            .save()
            .then(result => {
              console.log(result);
              res.status(200).json("Registered successfully");
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        } else {
          res.status(400).json("Key Failed");
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.signIn = (req, res) => {
  const { email } = req.body;
  admin
    .find({ email }, { email: 1, password: 1 })
    .exec()
    .then(result => {
      if (result.length >= 1) {
        const hash = result[0].password;
        const pass = bcrypt.compareSync(req.body.password, hash);
        if (pass) {
          admin
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
                process.env.JWT_KEY,
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
          res.status(400).json("Auth failed");
        }
      } else {
        res.status(400).json("no record found");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("invalid credentials");
    });
}