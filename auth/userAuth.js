const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//defining middleware for verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,process.env.USER_KEY);
    next();
  } catch (error) {
      res.status(400).json("Authentication failed");
  }
};