import mongoose from "mongoose";
const BurgerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  offered: {
    type: Boolean,
    default: false,
  },
});

const Burger = mongoose.model("Burger", BurgerSchema);
export default Burger;
