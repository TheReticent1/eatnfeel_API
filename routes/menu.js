const express = require("express");
const { addMenu, getMenu, updateMenu, deleteMenu, menuById } = require("../controllers/menu");
const authCheck = require("../auth/checkAuth");
const { addMenuValidator } = require("../validator/validation");
const router = express.Router();
const upload = require("../utilities/fileUploads");

router.post("/menu/add", authCheck, upload.single('imgPath'), addMenuValidator, addMenu);
router.get("/menu", getMenu);
router.put("/menu/:menuId", authCheck, upload.single('imgPath'), addMenuValidator, updateMenu); // only admin has right to edit menu
router.delete("/menu/:menuId", authCheck, deleteMenu); // only admin has right to delete menu

router.param("menuId", menuById);
module.exports = router;