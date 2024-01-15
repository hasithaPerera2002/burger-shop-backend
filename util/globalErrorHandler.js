import CustomErr from "./customErrorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.name == "CastError") {
    err = new CustomErr(`invalid value for ${err} : ${err.value}`, 400);
  }

  if (err.statusCode == 1000) {
    err = new CustomErr(`duplicate value for ${err}`, 400);
  }

  //mongoose errors
  if (err.keyValue === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    err = new CustomErr(message, 400);
  }

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("anewwwww");
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
