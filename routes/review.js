const { addReview, getReview, reviewById, deleteReview, updateReview } = require("../controllers/review");
const { reviewValidator } = require("../validator/validation");
const userAuth = require("../auth/userAuth");
const express = require("express");

const router = express.Router();

router.post("/review/add", userAuth, reviewValidator, addReview);
router.get("/review", getReview);
router.put("/review/:reviewId",userAuth,reviewValidator,updateReview);
router.delete("/review/:reviewId",userAuth,deleteReview);

router.param("reviewId",reviewById);
module.exports = router;