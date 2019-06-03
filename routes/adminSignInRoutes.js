"use strict";
const { loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const adminSignInRoutes = (req, res, Admin, bcrypt) => {
  const { email } = req.body;

  //check validation before authentication
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Admin
    .find({ email }, { email: 1, password: 1 })
    .exec()
    .then(result => {
      const hash = result[0].password;
      const pass = bcrypt.compareSync(req.body.password, hash);
      if (pass) {
        Admin
          .find({ email }, { name: 1, email: 1 })
          .exec()
          .then(result1 => {
            // token generation
            //payload
           var token = jwt.sign({
              email: result1[0].email,
              userId:result1[0]._id
            },
            //secret key
            process.env.JWT_KEY,
            //key expires in
            {
              expiresIn:"1h"
            }
            );

            return res.status(200).json({
              result:result1,
              token:token
            });
          })
          .catch(err => {
             res.status(400).json(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("invalid credentials");
    });
};

module.exports = { adminSignInRoutes };
