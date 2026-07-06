import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    const fetchWishlist =
      async () => {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const { data } =
          await axios.get(
            "http://localhost:5000/api/users/wishlist",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setProducts(data);
      };

    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <h1>❤️ My Wishlist</h1>

      <div className="admin-products">
        {products.map(
          (product) => (
            <div
              key={product._id}
              className="admin-product-card"
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <h3>
                {product.name}
              </h3>

              <h4>
                ₹
                {product.price.toLocaleString()}
              </h4>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Wishlist;