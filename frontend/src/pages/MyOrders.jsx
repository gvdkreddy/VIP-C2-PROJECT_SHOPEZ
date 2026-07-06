import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
  <div className="orders-page">
    <h1>📦 My Orders</h1>

    {orders.length === 0 ? (
      <div className="empty-orders">
        <h2>No Orders Yet</h2>
        <p>
          Start shopping to see your orders here.
        </p>
      </div>
    ) : (
      <div className="orders-container">
        {orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>
              Order #
              {order._id.slice(-6).toUpperCase()}
            </h3>

            <p>
              🛒 Items:
              {" "}
              {order.orderItems.length}
            </p>

            <p>
              💰 Total:
              {" "}
              ₹
              {order.totalPrice.toLocaleString()}
            </p>
            <p>
  Payment:
  {order.paymentMethod}
</p>
            <p className="order-status">
              ✅ Delivered
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default MyOrders;