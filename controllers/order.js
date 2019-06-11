const order = require("../models/orderModel");
const _ = require("lodash");

exports.addOrder = (req, res) => {
  const orders = new order(req.body);
  orders
    .save()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(400).json(error)
    });
};

exports.getOrder = (req, res) => {
  order
    .find()
    .select("_id userId name addressArea completeAddress mobile order total deliveryCharge coupon discount status")
    .exec((err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    });
}

exports.getUserOrder = (req, res) => {
  const id = req.param.userId;
  order
    .find(id)
    .select("order status dateOfOrder")
    .exec((err,result)=>{
      if(err){
        res.status(400).json("No food orders");
      }
      res.json(result);
    });
}

exports.orderById=(req,res,next,id)=>{
  order
  .findById(id)
  .exec((err,result)=>{
    if(err){
      res.status(400).json(err)
    }
    req.orders = result;
    next();
  });
};

exports.acceptOrder=(req,res)=>{
  let accept = req.orders;
  accept = _.extend(accept,req.body);
  accept.save((error)=>{
    if(error){
      res.status(400).json(error);
    }
    res.json(accept);
  });
};

exports.cancleOrder=(req,res)=>{
  let cancle = req.orders;
  cancle = _.extend(cancle,req.body);
  cancle.save((error)=>{
    if(error){
      res.status(400).json(error);
    }
    res.json(cancle);
  });
};