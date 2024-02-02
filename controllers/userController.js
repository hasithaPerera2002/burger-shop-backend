import User from "../models/user.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);

  const user = new User({
    username: req.body.userName,
    secondname: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save().then((user) => {
    res.status(200).json({ user });
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password }).then((user) => {
    if (user) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

export { addUser, login };
