const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const sendEmail =
  require("../utils/sendEmail");

// Create Order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(
      req.body
    );

    const user =
      await User.findById(
        req.body.user
      );

    if (user) {
      await sendEmail(
        user.email,
        "Order Confirmed",
        `
Thank you for shopping with SHOPEZ.

Order ID:
${order._id}

Total:
₹${order.totalPrice}

Your order has been placed successfully.

We will notify you once your order is delivered.
`
      );
    }

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User Orders
const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id,
      });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - All Orders
const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({})
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message:
        "Unable to fetch orders",
    });
  }
};

// Mark Order Delivered
const markDelivered = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }

    order.isDelivered = true;
    order.deliveredAt =
      Date.now();

    const updatedOrder =
      await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Stats
const getDashboardStats =
  async (req, res) => {
    try {

      const totalProducts =
        await Product.countDocuments();

      const totalUsers =
        await User.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const orders =
        await Order.find({});

      const revenue =
        orders.reduce(
          (total, order) =>
            total +
            order.totalPrice,
          0
        );

      res.json({
        products:
          totalProducts,
        users:
          totalUsers,
        orders:
          totalOrders,
        revenue,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  markDelivered,
  getDashboardStats,
};