import { Link } from "react-router-dom";

function OrderSuccess() {
  const orderId =
    localStorage.getItem("latestOrderId");
  const paymentMethod =
  localStorage.getItem(
    "latestPaymentMethod"
  );
  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
  ✅
</div>

<h1>Order Placed!</h1>

<p>
  Thank you for shopping with SHOPEZ
</p>

        <h3>
          Order ID:
          {" "}
          {orderId?.slice(-6)}
        </h3>
       <p>
  Payment Method:
  {paymentMethod}
</p>
            <p className="success-subtitle">
  Your order has been confirmed and
  will be processed shortly.
</p>
        <div className="success-buttons">

          <Link to="/myorders">
            <button>
              My Orders
            </button>
          </Link>
          
          <Link to="/products">
            <button>
              Continue Shopping
            </button>
          </Link>
          
        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;