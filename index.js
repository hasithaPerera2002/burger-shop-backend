import express from "express";
import mongoose from "mongoose";
import CustomError from "./util/customErrorHandler.js";
import globalErrorHandler from "./util/globalErrorHandler.js";
import burgerRouter from "./routes/burgerRouter.js";
import orderRouter from "./routes/orderRouter.js";
import userRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:27017/burger", {})
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection to MongoDB failed", err);
  });

app.use(express.json());
app.use("/api/v1/burgers", burgerRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
