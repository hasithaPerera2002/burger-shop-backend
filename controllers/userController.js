import User from "../models/user.js";
import asyncErrorHandler from "../util/asyncErrorHandler.js";

const addUser = asyncErrorHandler(async (req, res, next) => {
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
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  if (user) {
    const isPasswordValid = await comparePassword(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const comparePassword = async (candidatePassword, password) => {
  try {
    return candidatePassword === password;
  } catch (error) {
    throw new Error(error);
  }
};

export { addUser, login };
