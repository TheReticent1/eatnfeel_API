const mongoose = require("mongoose");

const orders = mongoose.Schema({
  userId:
  {
    type: String,
    required: true,
    lowercase: true
  },
  name:
  {
    type: String,
    required: true
  },
  mobile:
  {
    type: Number,
    required: true
  },
  addressArea:
  {
    type: String,
    required: true,
    lowercase: true
  },
  completeAddress:
  {
    type: String,
    required: true,
    lowercase: true
  },
  order: [{
    item:
    {
      type: String,
      lowercase: true,
      required: true
    },
    quantity:
    {
      type: Number,
      required: true
    },
    price:
    {
      type: Number,
      required: true
    }
  }],
  serviceTax: { type: Number },
  deliveryCharge: { type: Number },
  discount: { type: Number },
  total:
  {
    type: Number,
    required: true
  },
  coupon:
  {
    type: String,
    lowercase: true
  },
  status:
  {
    type: String,
    default: null,
    lowercase: true
  },
  dateOfOrder:
  {
    type: Date,
    default: Date.now()
  },
  estimateTime:{
    type:String,
    default:null
  }
});

module.exports = mongoose.model("order", orders);