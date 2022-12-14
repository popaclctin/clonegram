const fs = require('fs');
const multer = require('multer');
const createHttpError = require('http-errors');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = path.resolve(__dirname, './../public/uploads');
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
    }
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const uniqueFileName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        createHttpError(400, 'Only .png .jpg and .jpeg format allowed!')
      );
    }
  },
});

module.exports = upload;
