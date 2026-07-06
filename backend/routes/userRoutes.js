const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/userController");

const { protect } =
  require("../middleware/authMiddleware");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/wishlist/:id",
  protect,
  addToWishlist
);

router.get(
  "/wishlist",
  protect,
  getWishlist
);

router.delete(
  "/wishlist/:id",
  protect,
  removeFromWishlist
);

module.exports = router;