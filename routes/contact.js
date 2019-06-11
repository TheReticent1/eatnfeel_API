const express = require("express");
const {
  addMobileValidator,
  userIdValidator,
  postAddressValidator,
  updateMobileValidator,
  updateAddressValidator,
  verifyValidator
} = require("../validator/validation");
const {
  addMobile,
  getMobile,
  addAddress,
  getAddresses,
  addressById,
  mobileById,
  updateAddress,
  updateMobile,
  verifyNumber
} = require("../controllers/contact");
const userAuth = require("../auth/userAuth");

const router = express.Router();

router.post("/mobile/add", userAuth, addMobileValidator, addMobile);
router.get("/mobile/:userId", userAuth, userIdValidator, getMobile);
router.put("/mobile/:mobileId", userAuth, updateMobileValidator, updateMobile);
router.post("/address/add", userAuth, postAddressValidator, addAddress);
router.get("/addresses/:userId", userAuth, userIdValidator, getAddresses);
router.put("/addresses/:addressId", userAuth, updateAddressValidator, updateAddress);
router.post("/mobile/verify",verifyValidator,verifyNumber);

router.param("addressId", addressById);
router.param("mobileId", mobileById);

module.exports = router;