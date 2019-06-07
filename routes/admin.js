const express = require("express");
const { signUp, signIn, updateAdmin } = require("../controllers/admin");
const { addAdminValidator, signInValidator, updateAdminValidator } = require("../validator/validation");
const checkAuth = require("../auth/checkAuth");

const router = express.Router();

router.post("/super/signup", addAdminValidator, signUp);
router.post("/super/signin", signInValidator, signIn);
router.post("/super/update", checkAuth, updateAdminValidator, updateAdmin)

module.exports = router;