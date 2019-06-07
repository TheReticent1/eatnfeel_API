const express = require("express");
const { addMenu, getMenu ,updateMenu,deleteMenu} = require("../controllers/menu");
const authCheck = require("../auth/checkAuth");
const { addMenuValidator,updateMenuValidator } = require("../validator/validation");
const router = express.Router();

router.post("/menu/add", authCheck, addMenuValidator, addMenu);
router.get("/menu",getMenu);
router.post("/menu/update",authCheck,updateMenuValidator,updateMenu);
router.get("/menu/remove/:_id",authCheck,deleteMenu);
module.exports = router;