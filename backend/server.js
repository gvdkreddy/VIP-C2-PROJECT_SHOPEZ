require("dotenv").config();
const userRoutes =
  require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const testRoutes =
  require("./routes/testRoutes");
  
const connectDB = require("./config/db");

const productRoutes =
  require("./routes/productRoutes");
const app = express();
const orderRoutes =
  require("./routes/orderRoutes");
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => {
  res.send("SHOPEZ API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
