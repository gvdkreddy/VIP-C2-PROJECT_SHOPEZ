import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function Cart() {
const {
  cartItems,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = useContext(CartContext);
  const totalPrice = cartItems.reduce(
  (total, item) =>
    total + item.price * item.qty,
  0
);
  return (
    <div className="cart-page">
<h1>🛒 Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
     ) : (
  <>
    {cartItems.map((item) => (
      <div key={item.id} className="cart-item">
        <img src={item.image} alt={item.name} />

        <div className="cart-item-info">
  <h3>{item.name}</h3>

  <p className="cart-price">
  ₹{item.price.toLocaleString()}
</p>

  <div className="qty-controls">
    <button
      onClick={() =>
        decreaseQty(item._id)
      }
    >
      -
    </button>

    <span
      style={{
        margin: "0 10px",
      }}
    >
      {item.qty}
    </span>

    <button
      onClick={() =>
        increaseQty(item._id)
      }
    >
      +
    </button>
  </div>

  <p className="item-subtotal">
  Subtotal: ₹
    {(
      item.price * item.qty
    ).toLocaleString()}
  </p>

  <button
    className="remove-btn"
    onClick={() =>
      removeFromCart(item._id)
    }
  >
    Remove
  </button>
</div>
      </div>
    ))}
    <div className="cart-summary">

  <p>
    Total Items: {
      cartItems.reduce(
        (total, item) => total + item.qty,
        0
      )
    }
  </p>
      <h2>
        Total: ₹{totalPrice.toLocaleString()}
      </h2>
    </div>
  </>
)}
<Link to="/checkout">
  <button className="checkout-btn">
    Proceed to Checkout
  </button>
</Link>
    </div>
  );
}

export default Cart;