const express = require("express");
const { addMobileValidator, userIdValidator, postAddressValidator } = require("../validator/validation");
const { addMobile, getMobile, addAddress, getAddresses } = require("../controllers/contact");

const router = express.Router();

router.post("/mobile/add", addMobileValidator, addMobile);
router.get("/mobile/:userId", userIdValidator, getMobile);
router.post("/address/add", postAddressValidator, addAddress);
router.get("/addresses/:userId", userIdValidator, getAddresses);

module.exports = router;