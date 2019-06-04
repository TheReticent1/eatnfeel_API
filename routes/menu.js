const express = require("express");
const { addMenu, getMenu } = require("../controllers/menu");
const authCheck = require("../auth/checkAuth");
const { addMenuValidator } = require("../validator/validation");
const router = express.Router();

router.post("/menu/add", authCheck, addMenuValidator, addMenu);
router.get("/menu",getMenu);
module.exports = router;