import express from "express";
import mongoose from "mongoose";

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  mongoose
    .connect("mongodb://localhost:27017/burger", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Connection failed", err);
    });
});

console.log("hii");
