const mongoose = require("mongoose");

const menu = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true },
  description: { type: String, lowercase: true },
  labels: { type: String, lowercase: true },
  price: { type: Number },
  food_type: { type: String, lowercase: true },
  imgPath: { type: String, lowercase: true }
});

module.exports = mongoose.model("menu", menu);
