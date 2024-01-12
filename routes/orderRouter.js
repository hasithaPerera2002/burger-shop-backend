import express from "express";
import {
  addOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").put(updateOrder);

export default router;
