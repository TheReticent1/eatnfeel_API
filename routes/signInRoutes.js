"use strict";
const { loginValidation } = require("../validation");

const signInRoutes = (req, res, signUp, bcrypt) => {
  const { email } = req.body;

  //check validation before authentication
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
            res.status(400).json("invalid password");
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("invalid credentials");
    });
};

module.exports = { signInRoutes };
