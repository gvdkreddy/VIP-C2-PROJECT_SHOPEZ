import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.get(
        "http://localhost:5000/api/orders",
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const deliverHandler = async (
  id
) => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

    await axios.put(
      `http://localhost:5000/api/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${userInfo.token}`,
        },
      }
    );

    fetchOrders();
  } catch (error) {
    console.error(error);
  }
};  
  return (
    <div className="admin-orders-page">

      <h1>📦 All Orders</h1>

      <div className="orders-grid">

        {orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>
              Order #
              {order._id.slice(-6)}
            </h3>

            <p>
              Customer:
              {" "}
              {order.user?.name}
            </p>

            <p>
              Email:
              {" "}
              {order.user?.email}
            </p>

            <p>
              Items:
              {" "}
              {order.orderItems.length}
            </p>

            <p>
              Total:
              {" "}
              ₹
              {order.totalPrice.toLocaleString()}
            </p>
            <p>
  Payment:
  {order.paymentMethod}
</p>
           <p>
  Status:
  {order.isDelivered
    ? " ✅ Delivered"
    : " 🚚 Processing"}
</p>

{!order.isDelivered && (
  <button
    className="deliver-btn"
    onClick={() =>
      deliverHandler(order._id)
    }
  >
    Mark Delivered
  </button>
)}
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminOrders;