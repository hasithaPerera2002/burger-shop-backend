import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  googleId,
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  secondName: {
    type: String,
    required: [true, "Second name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters!"],
  },
  email: {
    type: email,
    required: [true, "Email is required"],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address!",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
