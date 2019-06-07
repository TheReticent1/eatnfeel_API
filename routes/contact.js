const express = require("express");
const {
  addMobileValidator,
  userIdValidator,
  postAddressValidator,
  updateMobileValidator,
  updateAddressValidator } = require("../validator/validation");
const { addMobile, getMobile, addAddress, getAddresses, updateMobile, updateAddress } = require("../controllers/contact");
const userAuth = require("../auth/userAuth");

const router = express.Router();

router.post("/mobile/add", userAuth, addMobileValidator, addMobile);
router.get("/mobile/:userId", userAuth, userIdValidator, getMobile);
router.post("/mobile/update", userAuth, updateMobileValidator, updateMobile);
router.post("/address/add", userAuth, postAddressValidator, addAddress);
router.get("/addresses/:userId", userAuth, userIdValidator, getAddresses);
router.post("/address/update", userAuth, updateAddressValidator, updateAddress);

module.exports = router;