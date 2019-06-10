"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const morgan = require("morgan");

//invokes express
let app = express();

//connection
const { mongoose } = require("./db/index");

//import routes
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const menuRoutes = require("./routes/menu");
const tableRoutes = require("./routes/table");
const orderRoutes = require("./routes/order");
const logger = require("./logs/log");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined", { stream: logger.stream })); //morgan global error handler
app.use(expressValidator());
app.use("/", userRoutes);
app.use("/", contactRoutes);
app.use("/", adminRoutes);
app.use("/", menuRoutes);
app.use("/", tableRoutes);
app.use("/", orderRoutes);

app.listen(3000, () => {
  logger.info("server running on port 3000");
});