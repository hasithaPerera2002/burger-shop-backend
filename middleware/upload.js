import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";
import CustomError from "../util/customErrorHandler.js";

initializeApp(firebaseConfig);

const fireStorage = getStorage();

const upload = async (req, res, next) => {
  try {
    const file = req.body.file || req.file;
    if (!file) {
      throw new CustomError("Please upload a file", 400);
    }

    const imageRef = ref(
      fireStorage,
      "images/" + file.originalname + Date.now()
    );
    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      imageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    req.image = downloadURL;
    next();
  } catch (error) {
    next(new CustomError("File upload failed: " + error.message, 500));
  }
};

export default upload;
