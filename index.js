import express from "express";
import mongoose from "mongoose";
import CustomError from "./util/customErrorHandler.js";
import globalErrorHandler from "./util/globalErrorHandler.js";
import burgerRouter from "./routes/burgerRouter.js";
import orderRouter from "./routes/orderRouter.js";
import userRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(URI, clientOptions)
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
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ephemeral-lollipop-0ed82a.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/burgers", burgerRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
