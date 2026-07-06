const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken =
  require("../utils/generateToken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      console.log(user);
        res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: generateToken(user._id),
});
    } else {
      res.status(401).json({
        message:
          "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const addToWishlist = async (
  req,
  res
) => {
  const user =
    await User.findById(
      req.user._id
    );

  if (
    !user.wishlist.includes(
      req.params.id
    )
  ) {
    user.wishlist.push(
      req.params.id
    );

    await user.save();
  }

  res.json(user.wishlist);
};

const removeFromWishlist =
  async (req, res) => {
    const user =
      await User.findById(
        req.user._id
      );

    user.wishlist =
      user.wishlist.filter(
        (item) =>
          item.toString() !==
          req.params.id
      );

    await user.save();

    res.json(user.wishlist);
};

const getWishlist = async (
  req,
  res
) => {
  const user =
    await User.findById(
      req.user._id
    ).populate("wishlist");

  res.json(user.wishlist);
};

module.exports = {
  registerUser,
  loginUser,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};