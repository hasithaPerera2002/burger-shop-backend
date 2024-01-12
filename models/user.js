import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  secondname: {
    type: String,
    required: [true, "Second name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [2, "Password must be at least 6 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address!",
    },
  },
});
export default mongoose.model("User", UserSchema);
