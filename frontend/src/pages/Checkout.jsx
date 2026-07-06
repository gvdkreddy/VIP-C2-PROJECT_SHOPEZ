import { useState } from "react";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
function Checkout() {
  const navigate = useNavigate();
  const applyCoupon = () => {

  if (coupon === "WELCOME10") {
    setDiscount(10);
    alert("10% Discount Applied");
  }

  else if (coupon === "SAVE20") {
    setDiscount(20);
    alert("20% Discount Applied");
  }

  else {
    alert("Invalid Coupon");
    setDiscount(0);
  }
};
    const placeOrder = async () => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const orderData = {
      user: userInfo._id,
      paymentMethod,
      orderItems: cartItems.map(
  (item) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.qty,
  })
),

      shippingAddress: {
        address,
        city,
        state,
        pincode,
        phone,
      },

     totalPrice: finalTotal
    };

    const { data } =
      await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );
      console.log("ORDER SUCCESS");
      localStorage.setItem(
  "latestOrderId",
  data._id
);
console.log("Payment Method =", paymentMethod);
localStorage.setItem(
  "latestPaymentMethod",
  paymentMethod
);

    alert("Order Placed!");

    console.log(data);
      clearCart();
navigate("/ordersuccess");
  } catch (error) {
    console.error(error);
  }
};
   const {
  cartItems,
  clearCart,
} = useContext(CartContext);
    const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
);
  const [address, setAddress] =
    useState("");
  const [paymentMethod, setPaymentMethod] =
  useState("Cash On Delivery");
  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("");

  const [pincode, setPincode] =
    useState("");
    const [coupon, setCoupon] =
  useState("");

const [discount, setDiscount] =
  useState(0);
if (!userInfo) {
  return <Navigate to="/login" />;
}
const subtotal =
  cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.qty,
    0
  );

const discountAmount =
  (subtotal * discount) / 100;

const finalTotal =
  subtotal - discountAmount;
  return (
  <div className="checkout-page">

    <h1 className="checkout-title">
      Checkout
    </h1>

    <div className="checkout-container">

      {/* Shipping Form */}

      <div className="checkout-form">

        <h2>Shipping Details</h2>

        <input
          className="checkout-input"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          className="checkout-input"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          className="checkout-input"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          className="checkout-input"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) =>
            setState(e.target.value)
          }
        />

        <input
          className="checkout-input"
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
        />

      </div>
            <h3>Payment Method</h3>

<select
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(e.target.value)
  }
>
  <option>
    Cash On Delivery
  </option>

  <option>
    UPI
  </option>

  <option>
    Credit/Debit Card
  </option>
</select>

<br />
<br />
      {/* Order Summary */}

      <div className="checkout-summary">
            <div className="coupon-box">

  <input
    type="text"
    placeholder="Coupon Code"
    value={coupon}
    onChange={(e) =>
      setCoupon(e.target.value)
    }
  />

  <button
    onClick={applyCoupon}
  >
    Apply
  </button>

</div>
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="summary-item"
          >
            <div>
              <h4>{item.name}</h4>

              <p>
                Qty: {item.qty}
              </p>
            </div>

            <h4>
              ₹
              {(
                item.price *
                item.qty
              ).toLocaleString()}
            </h4>
          </div>
        ))}

        <div className="summary-total">
          <h2>
            ₹
            {cartItems
              .reduce(
                (total, item) =>
                  total +
                  item.price *
                    item.qty,
                0
              )
              .toLocaleString()}
          </h2>

         <p>
  Subtotal:
  ₹{subtotal.toLocaleString()}
</p>

<p>
  Discount:
  ₹{discountAmount.toLocaleString()}
</p>

<h3>
  Total:
  ₹{finalTotal.toLocaleString()}
</h3>
        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>

  </div>
);
}

export default Checkout;