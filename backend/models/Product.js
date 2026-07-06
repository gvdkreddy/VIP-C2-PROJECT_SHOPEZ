const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    specs: {
      type: [String],
      default: [],
    },
    rating: {
  type: Number,
  default: 4.5,
},

numReviews: {
  type: Number,
  default: 0,
},

reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    rating: Number,

    comment: String,
  },
],

numReviews: {
  type: Number,
  default: 0,
},

rating: {
  type: Number,
  default: 0,
},
countInStock: {
  type: Number,
  default: 10,
},
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Product",
  productSchema
);