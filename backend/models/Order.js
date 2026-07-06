const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],

    shippingAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
paymentMethod: {
  type: String,
  default: "Cash On Delivery",
},
    totalPrice: {
  type: Number,
  required: true,
},

isDelivered: {
  type: Boolean,
  default: false,
},

deliveredAt: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);