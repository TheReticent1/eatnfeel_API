const express = require("express");
const { signUp, signIn } = require("../controllers/admin");
const { addAdminValidator, signInValidator } = require("../validator/validation");

const router = express.Router();

router.post("/super/signup", addAdminValidator, signUp);
router.post("/super/signin",signInValidator,signIn);

module.exports = router;