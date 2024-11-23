const multer = require("multer");

const uuid = require("uuid").v1;

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("DESTIMATION");
      cb(null, "uploads/images");
    },
    fileName: (req, file, cb) => {
      console.log("FILE NAME");

      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log("FILE FILTER");

    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid MIME Type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
