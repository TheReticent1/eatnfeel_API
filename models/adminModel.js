const mongoose = require('mongoose');

const adminModel = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  regDate: {
    type: Date,
    default: Date.now()
  },
  authKey:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Admin',adminModel);