const express = require("express");
const { signUpValidator, signInValidator, updateValidator } = require("../validator/validation");
const { signUp, signIn, updateUser } = require("../controllers/user");
const userAuth = require("../auth/userAuth");

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);
router.post("/update", userAuth, updateValidator, updateUser);

module.exports = router;