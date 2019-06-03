"use strict"
//imports
const dotenv = require("dotenv");
dotenv.config();
//import validation.js
const { adminValidation } = require("../validation");

const adminSignUp = (req, res, Admin, mongoose, bcrypt) => {

  const { name, email, password, authKey } = req.body;
  //auto-gen a hash password
  const hash = bcrypt.hashSync(password);
  const resto = bcrypt.hashSync(authKey);
  //checking admin key to register as admin
  const skey = bcrypt.compareSync(process.env.ADMIN_KEY, resto);
  //check validation before authentication
  const { error } = adminValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Admin.findOne({
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
          const signup = new Admin({
            _id: mongoose.Types.ObjectId(),
            name: name,
            email: email,
            password: hash,
            authKey:resto,
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

module.exports = { adminSignUp };