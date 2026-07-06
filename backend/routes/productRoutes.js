const express = require("express");

const router = express.Router();

const { protect } =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  admin,
  createProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

router.post(
  "/:id/reviews",
  protect,
  createReview
);

module.exports = router;