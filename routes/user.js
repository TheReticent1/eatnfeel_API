const express = require("express");
const { signUpValidator, signInValidator } = require("../validator/validation");
const { signUp, signIn } = require("../controllers/user");

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);

module.exports = router;