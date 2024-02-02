import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig.js";
import CustomError from "../util/customErrorHandler.js";
import multer from "multer";

const app = initializeApp(firebaseConfig);

const fireStorage = getStorage(app);
const multerUpload = multer({ storage: multer.memoryStorage() });

const upload = async (req, res, next) => {
  try {
    multerUpload.single("image")(req, res, async (err) => {
      if (err) {
        return next(
          new CustomError("Multer upload failed: " + err.message, 500)
        );
      }
      console.log(req.body);
      const file = req.file || req.body.file;
      if (!file) {
        return next(new CustomError("Please upload a file", 400));
      }

      const imageRef = ref(
        fireStorage,
        "files/" + file.originalname + Date.now()
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
      console.log("File available at", downloadURL);
      req.image = downloadURL;
      res.image = downloadURL;
      next();
    });
  } catch (error) {
    next(new CustomError("File upload failed: " + error.message, 500));
  }
};

export default upload;
