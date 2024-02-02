import multer from "multer";
import CustomError from "../util/customErrorHandler.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";

initializeApp(firebaseConfig);

const fireStorage = getStorage();

const storage = multer({ storage: multer.memoryStorage() });
const upload = async (req, res, next) => {
  const file = req.body.file || req.file;
  if (!file) {
    return next(new CustomError("Please upload a file", 400));
  }
  const imageRef = ref(fireStorage, "images/" + file.originalname + Date.now());
  const metadata = {
    contentType: file.mimetype,
  };
  await uploadBytesResumable(imageRef, file.buffer, metadata)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        req.image = downloadURL;
        next();
      });
    })
    .catch((err) => {
      return next(new CustomError("File upload failed", 500));
    });
};

export default upload;
