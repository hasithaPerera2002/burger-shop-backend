import multer from "multer";
import CustomError from "../util/customErrorHandler.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { config } from "../firebase/firebaseConfig.js";
import express from "express";

const router = express.Router();

initializeApp(config.firebaseConfig);

const fireStorage = getStorage();

const storage = multer({ storage: multer.memoryStorage() });
router.post("/", storage.single("image"), async (req, res, next) => {
  const file = req.body.file || req.file;
  if (!file) {
    return next(new CustomError("Please upload a file", 400));
  }
  const imageRef = ref(fireStorage, "images/" + file.originalname + Date.now());
  const metadata = {
    contentType: file.mimetype,
  };
  await uploadBytesResumable(imageRef, file.buffer, metadata).then(
    (snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        res.status(200).json({ downloadURL });
      });
    }
  );
});

export default upload;
