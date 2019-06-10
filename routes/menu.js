const express = require("express");
const { addMenu, getMenu, updateMenu, deleteMenu, menuById } = require("../controllers/menu");
const authCheck = require("../auth/checkAuth");
const { addMenuValidator } = require("../validator/validation");
const router = express.Router();
const multer = require("multer");
//storing file on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().substring(0, 10) + file.originalname);
  }
});
//filtering type of file like jpeg and png
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('unsupported file'), false);
  }
}
//multer method invoke
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/menu/add", authCheck, upload.single('imgPath'), addMenuValidator, addMenu);
router.get("/menu", getMenu);
router.put("/menu/:menuId", authCheck, upload.single('imgPath'), addMenuValidator, updateMenu); // only admin has right to edit menu
router.delete("/menu/:menuId", authCheck, deleteMenu); // only admin has right to delete menu

router.param("menuId", menuById);
module.exports = router;