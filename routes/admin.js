const express = require("express");
const {
  signUp,
  signIn,
  getadminUser,
  updateAdminUsers,
  deleteAdminUsers,
  adminById,
  admins } = require("../controllers/admin");
const { addAdminValidator, signInValidator, updateAdminValidator } = require("../validator/validation");
const checkAuth = require("../auth/checkAuth");
const { allUsers } = require("../controllers/user");

const router = express.Router();

router.post("/super/signup", addAdminValidator, signUp);
router.post("/super/signin", signInValidator, signIn);
router.get("/super/:adminId", checkAuth, getadminUser); // only admin can view admin user detail
router.put("/super/:adminId", checkAuth, updateAdminValidator, updateAdminUsers); //admin can update admin user
router.delete("/super/:adminId", checkAuth, deleteAdminUsers); //admin can delete admin user
router.get("/super",checkAuth,admins);
router.get("/users", checkAuth, allUsers); // only admin has right to get all client side users

//getting adminById paramsgetadminUser
router.param("adminId", adminById);

module.exports = router;