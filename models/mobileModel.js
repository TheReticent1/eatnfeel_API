const mongoose = require('mongoose');

const mobiles = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  mobile: { type: Number, unique: true, minlength: 10, maxlength: 10 }
})

module.exports = mongoose.model("mobiles", mobiles);