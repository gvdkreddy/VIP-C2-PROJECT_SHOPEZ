import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";
import AdminOrders from "./pages/AdminOrders";
import Wishlist from "./pages/Wishlist";

function App() {
  
  const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
);
  const { cartItems } = useContext(CartContext);
  return (
    <BrowserRouter>
      <div>

        <div className="navbar">
          <h1>🛒 SHOPEZ</h1>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart ({cartItems.length})</Link>
            
            {userInfo ? (
  <>
    <span>
      Hi, {userInfo.name}
    </span>
    <Link to="/wishlist">
  Wishlist
</Link>
      {userInfo?.isAdmin && (
 <>
  <Link to="/admin">
    Admin
  </Link>

  <Link to="/admin/orders">
    Orders
  </Link>
</>
)}
    <button  className="logout-btn"
      onClick={() => {
        localStorage.removeItem(
          "userInfo"
        );

        window.location.reload();
      }}
    >
      Logout
    </button>
    {userInfo && (
  <Link to="/myorders">
    My Orders
  </Link>
)}
  </>
) : (
  <>
    <Link to="/login">
      Login
    </Link>

    <Link to="/register">
      Register
    </Link>
  </>
)}
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorders" element={<MyOrders />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/admin/orders" element={<AdminOrders />} />  
          <Route
  path="/wishlist"
  element={<Wishlist />}
/>
          <Route
  path="/ordersuccess"
  element={<OrderSuccess />}
/>
          <Route
  path="/admin"
  element={<Admin />}
/>
        </Routes>
        <footer className="footer">
  <h3>🛒 SHOPEZ</h3>

  <p>
    Your one-stop destination for
    electronics, fashion and footwear.
  </p>

  <p>© 2025 SHOPEZ</p>
</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;