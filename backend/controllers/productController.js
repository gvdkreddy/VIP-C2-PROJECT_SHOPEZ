const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(
      req.body
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name =
      req.body.name || product.name;

    product.brand =
      req.body.brand || product.brand;

    product.category =
      req.body.category ||
      product.category;

    product.price =
      req.body.price || product.price;

    product.image =
      req.body.image || product.image;

    product.specs =
      req.body.specs || product.specs;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createReview = async (
  req,
  res
) => {
  const {
    rating,
    comment,
  } = req.body;

  const product =
    await Product.findById(
      req.params.id
    );

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  product.numReviews =
    product.reviews.length;

  product.rating =
    product.reviews.reduce(
      (acc, item) =>
        acc + item.rating,
      0
    ) /
    product.reviews.length;

  await product.save();

  res.status(201).json({
    message:
      "Review Added",
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};