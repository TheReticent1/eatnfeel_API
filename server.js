"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
let app = express();

//connection
const { mongoose } = require("./db/index");

//models
const addMenu = require("./models/addMenu");
const signUp = require("./models/signUpModel");
const mobile = require("./models/mobileModel");
const address = require("./models/addressModel");

// Import routes

const addMenuRoutes = require("./routes/adMenuRoutes");
const getMenuRoutes = require("./routes/getMenuRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const signInRoutes = require("./routes/signInRoutes");
const mobileRoutes = require("./routes/mobileRoutes");
const getMobileRoutes = require("./routes/getMobileRoutes");
const addAddressRoutes = require("./routes/addAddressRoutes");
const getAddressRoutes = require("./routes/getAddressRoutes");
const logger = require("./logs/log");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const morgan = require("morgan");

//controllers
app.post("/addmenu", (req, res) => {
  addMenuRoutes.addMenuRoutes(req, res, addMenu, mongoose);
});
app.get("/menu", (req, res) => {
  getMenuRoutes.getMenuRoute(req, res, addMenu);
});
app.post("/signup", async (req, res) => {
  await signUpRoutes.signUpRoutes(req, res, bcrypt, signUp, mongoose);
});
app.post("/signin", (req, res) => {
  signInRoutes.signInRoutes(req, res, signUp, bcrypt);
});
app.post("/mobile/add", (req, res) => {
  mobileRoutes.mobileRoutes(req, res, mongoose, mobile);
});
app.post("/mobile", (req, res) => {
  getMobileRoutes.getMobileRoutes(req,res,mobile);
});
app.post("/address/add",(req,res)=>{
  addAddressRoutes.addAddress(req,res,mongoose,address);
})
app.post("/addresses",(req,res)=>{
  getAddressRoutes.getAddressRoutes(req,res,address);
})

//morgan middleware can be used to tranfer error to console, one file to another file etc
app.use(morgan("combined", { stream: logger.stream }));

app.listen(3000, () => {
  logger.info("server running on port 3000");
});
