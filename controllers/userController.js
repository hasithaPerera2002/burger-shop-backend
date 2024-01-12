import User from "../models/user.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addUser = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  console.log(req);
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

export { addUser };
