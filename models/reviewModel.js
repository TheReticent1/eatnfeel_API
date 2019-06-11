const mongoose = require("mongoose");

const review = mongoose.Schema({
  userId: { type: String, lowercase: true, required: true },
  name: { type: String, lowercase: true, required: true },
  rating: { type: Number, default: 0, required: true },
  reviewDate: { type: Date, default: Date.now() },
  comment: { type: String, lowercase: true }
});

module.exports = mongoose.model("review",review);