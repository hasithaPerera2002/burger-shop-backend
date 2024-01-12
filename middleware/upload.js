import multer from "multer";
import CustomError from "../util/customErrorHandler.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new CustomError("Only .jpeg and .png format allowed!", 500), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
