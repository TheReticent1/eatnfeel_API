const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//defining middleware for verification
module.exports = (req, res, next) => {
  try {
    const verify = jwt.verify(req.headers.authorization,process.env.JWT_KEY);
    console.log(verify);
    next();
  } catch (error) {
      res.status(400).json("Authentication failed");
  }
};