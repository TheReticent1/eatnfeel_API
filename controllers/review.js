const review = require("../models/reviewModel");
const _ = require("lodash");

exports.addReview = (req, res) => {
  const Review = new review(req.body);
  Review.save((error) => {
    if (error) {
      res.status(400).json(error);
    }
    res.json(Review);
  });
};

exports.getReview = (req, res) => {
  review
    .find()
    .select("name reviewDate rating comment")
    .exec((error, result)=>{
      if(error){
        res.json(error);
      }
      res.json(result);
    });
};

exports.reviewById=(req,res,next,id)=>{
  review.findById(id).exec((err,review)=>{
    if(err || !review){
      res.status(400).json({
        error:"please try after some time"
      });
    }
    req.reviews = review;
    next();
  });
};

exports.updateReview=(req,res)=>{
  let review = req.reviews;
  review = _.extend(review,req.body);
  review.save((err,result)=>{
    if(err){
      res.status(400).json(err);
    }
    res.json(result);
  });
};

exports.deleteReview = (req, res) => {
  let review = req.reviews;
  review.remove((err, result) => {
    if (err || !result) {
      res.status(400).json({
        error: err
      });
    }
    res.json("Review deleted successfully");
  });
};