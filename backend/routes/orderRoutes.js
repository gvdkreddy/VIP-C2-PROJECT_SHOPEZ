const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  markDelivered,
  getDashboardStats,
  
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  createOrder
);

router.get(
  "/myorders",
  protect,
  getMyOrders
);

router.get(
  "/stats/dashboard",
  protect,
  admin,
  getDashboardStats
);
router.get(
  "/",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/:id/deliver",
  protect,
  admin,
  markDelivered
);



module.exports = router;