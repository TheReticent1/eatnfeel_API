
const express = require("express");
const { signUpValidator, signInValidator, updateUserValidator } = require("../validator/validation");
const {
  signUp,
  signIn,
  userById,
  getUser,
  updateUser
} = require("../controllers/user");
const userAuth = require("../auth/userAuth");

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);
router.get("/user/:userId", userAuth, getUser); // logged in client side users can view their own user profile
router.put("/user/:userId", userAuth, updateUserValidator, updateUser); // logged in client side users can edit their own user profile

router.param("userId", userById);

module.exports = router;