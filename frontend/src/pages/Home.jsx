import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Home() {
  const { addToCart } =
    useContext(CartContext);

  const [products, setProducts] =
    useState([]);


  const recentProducts =
    JSON.parse(
      localStorage.getItem(
        "recentProducts"
      )
    ) || [];

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const { data } =
            await axios.get(
              "http://localhost:5000/api/products"
            );

          setProducts(data);
        } catch (error) {
          console.error(error);
        }
      };

    fetchProducts();
  }, []);

  const electronics =
    products
      .filter(
        (p) =>
          p.category === "Laptop" ||
          p.category === "Mobile"
      )
      .slice(0, 2);

  const clothing =
    products
      .filter(
        (p) =>
          p.category === "Clothing"
      )
      .slice(0, 2);

  const footwear =
    products
      .filter(
        (p) =>
          p.category === "Footwear"
      )
      .slice(0, 2);

  const renderProducts = (
    productList
  ) => (
    <div className="products-container">
      {productList.map(
        (product) => (
          <div
            className="product-card"
            key={product._id}
          >
            <img
              src={product.image}
              alt={product.name}
            />

            <p className="category">
              {product.category}
            </p>

            <h2>
              {product.name}
            </h2>

            <p className="brand">
              {product.brand}
            </p>

            <div className="rating">
              ⭐ {product.rating}
              {" "}
              (
              {product.numReviews}
              {" "}
              Reviews)
            </div>

            <p className="price">
              ₹
              {product.price.toLocaleString()}
            </p>

            <div className="product-buttons">
              <button
                onClick={() =>
                  addToCart({
                    _id:
                      product._id,
                    name:
                      product.name,
                    price:
                      product.price,
                    image:
                      product.image,
                    countInStock:
                      product.countInStock,
                  })
                }
              >
                Add To Cart
              </button>

              <Link
                to={`/product/${product._id}`}
              >
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
console.log("Total Products:", products.length);
console.log("Electronics:", electronics);
console.log("Clothing:", clothing);
console.log("Footwear:", footwear);
  return (
    <div>
      <div className="hero">
        <h2>
          ⚡ Shop Smart,
          Live Better
        </h2>

        <p>
          Discover the latest
          gadgets, fashion and
          accessories at amazing
          prices.
        </p>
      </div>


      <div className="offers-banner">
        <div className="offer-card">
          🔥 Flat 10% OFF
          <p>
            Use WELCOME10
          </p>
        </div>

        <div className="offer-card">
          ⚡ Flat 20% OFF
          <p>
            Use SAVE20
          </p>
        </div>

        <div className="offer-card">
          🚚 Free Shipping
          <p>
            Orders Above ₹999
          </p>
        </div>
      </div>

      <h1 className="products-title">
  💻 Electronics
</h1>

{renderProducts(electronics)}

<div className="view-all-container">
  <Link to="/products">
    <button className="view-all-btn">
      View All Products
    </button>
  </Link>
</div>

<h1 className="products-title">
  👕 Clothing
</h1>

{renderProducts(clothing)}

<div className="view-all-container">
  <Link to="/products">
    <button className="view-all-btn">
      View All Products
    </button>
  </Link>
</div>

<h1 className="products-title">
  👟 Footwear
</h1>

{renderProducts(footwear)}

<div className="view-all-container">
  <Link to="/products">
    <button className="view-all-btn">
      View All Products
    </button>
  </Link>
</div>

      <h2 className="section-title">
        Recently Viewed
      </h2>

      <div className="products-container">
        {recentProducts.map(
          (product) => (
            <div
              key={product._id}
              className="product-card"
            >
              <img
                src={
                  product.image
                }
                alt={
                  product.name
                }
              />

              <h3>
                {product.name}
              </h3>

              <p>
                ₹
                {product.price.toLocaleString()}
              </p>

              <Link
                to={`/product/${product._id}`}
              >
                <button>
                  View Again
                </button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;