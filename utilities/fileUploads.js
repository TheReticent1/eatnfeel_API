const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().substring(0, 10) + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error("file is not supported"), false);
      return;
    }
    cb(null, true);
  }
});