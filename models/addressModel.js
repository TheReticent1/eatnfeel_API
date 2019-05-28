const mongoose = require("mongoose");

const addressModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  addressArea: { type: String, required: true, lowercase: true, minlength:6 },
  completeAddress: { type: String, required: true, lowercase: true,minlength:15 },
  addressType: { type: String, required: true, lowercase: true , minlength:4}
})

module.exports = mongoose.model("addressModel", addressModel);