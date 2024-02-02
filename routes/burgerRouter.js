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
router.route("/").get(getBurgers).post(upload, addBurger);
router
  .route("/:id")
  .put(upload, updateBurger)
  .get(getBurger)
  .delete(deleteBurger);
router.route("/image/:id").put(upload, updateBurgerImage);

export default router;
