import express from "express";
import { addUser, login } from "../controllers/userController.js";
const router = express.Router();

router.route("/").post(addUser);
router.route("/login").post(login);

export default router;
