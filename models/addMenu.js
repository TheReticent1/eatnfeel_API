const mongoose = require("mongoose");

const addmenu = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String,unique:true, lowercase: true },
  description: { type: String, lowercase: true },
  labels: { type: String, lowercase: true },
  price: { type: Number },
  food_type: { type: String, lowercase: true }
});

module.exports = mongoose.model("addMenu", addmenu);
