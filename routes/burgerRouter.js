import express from "express";
import {
  addBurger,
  deleteBurger,
  getBurgers,
  getBurger,
  updateBurger,
  updateBurgerImage,
} from "../controllers/burgerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.route("/").get(getBurgers).post(upload.single("image"), addBurger);
router
  .route("/:id")
  .put(upload.single("image"), updateBurger)
  .get(getBurger)
  .delete(deleteBurger);
router.route("/image/:id").put(upload.single("image"), updateBurgerImage);

export default router;
