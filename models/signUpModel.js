"use strict";
const Joi = require("joi");
const mongoose = require("mongoose");

const signUp = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

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
  reg_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("signUp", signUp);
