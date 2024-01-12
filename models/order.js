import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  burger: [
    {
      burger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Burger",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],

    default: "Pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
