"use strict";
const { signupValidation } = require("../validation");

const signUpRoutes = (req, res, bcrypt, signUp, mongoose) => {
  const { name, email, password } = req.body;
  //auto-gen a hash password
  const hash = bcrypt.hashSync(password);

  //check validation before authentication
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

module.exports = { signUpRoutes };
