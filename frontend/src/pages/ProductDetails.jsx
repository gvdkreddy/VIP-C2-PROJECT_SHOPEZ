import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [rating, setRating] =
  useState(5);

const [comment, setComment] =
  useState("");
const [product, setProduct] = useState(null);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
      const recent =
  JSON.parse(
    localStorage.getItem(
      "recentProducts"
    )
  ) || [];

const updated = [
  data,
  ...recent.filter(
    (p) => p._id !== data._id
  ),
].slice(0, 5);

localStorage.setItem(
  "recentProducts",
  JSON.stringify(updated)
);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProduct();
}, [id]);

  if (!product) {
  return (
    <div className="loading-page">
      <h2>Loading Product...</h2>
    </div>
  );
}
const submitReview = async () => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    await axios.post(
      `http://localhost:5000/api/products/${id}/reviews`,
      {
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Review Added");

    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};

const addWishlist = async () => {
  try {
    console.log("Wishlist clicked");

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const { data } = await axios.post(
      `http://localhost:5000/api/users/wishlist/${product._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    console.log(data);

    alert("Added to Wishlist ❤️");
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);
  }
};
  return (
    
    <div className="product-details">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info details-card">

        <h1>{product.name}</h1>

          <p className="details-category">
  {product.category}
</p>
        <p className="product-brand">
  Brand: {product.brand}
</p>

<p>
  Stock Value: {String(product.countInStock)}
</p>

       <div className="details-rating">
  ⭐⭐⭐⭐⭐
  <span>
    {" "}
    {product.rating} ({product.numReviews} Reviews)
  </span>
</div>

        <div className="product-price">
  ₹{product.price.toLocaleString()}
</div>

      <p className="deal-tag">
  🔥 Best Price Available
</p>

       {product.countInStock > 0 ? (
  <p className="stock">
    ✅ {product.countInStock} In Stock
  </p>
) : (
  <p
    style={{
      color: "#ef4444",
      fontWeight: "bold",
    }}
  >
    ❌ Out Of Stock
  </p>
)}

        <div className="delivery-info">
  <p>🚚 Free Delivery by Tomorrow</p>
  <p>🔒 1 Year Warranty Included</p>
  <p>💳 Secure Payment</p>
</div>
        <h2>Specifications</h2>

        <ul className="product-specs">
  {product.specs.map((spec, index) => (
    <li key={index}>
      ✓ {spec}
    </li>
  ))}
</ul>




        <div className="buy-buttons">

         <button
  className="cart-btn"
  disabled={!product.countInStock}
  onClick={() => {
    if (product.countInStock === 0) return;

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      countInStock:
        product.countInStock,
    });
  }}
>
   {product.countInStock > 0
  ? "Add To Cart"
  : "Out Of Stock"}
</button>

          <button className="buy-btn">
            Buy Now
          </button>
<button
  className="wishlist-btn"
  onClick={addWishlist}
>
  ❤️ Wishlist
</button>
        </div>
        <h2>Customer Reviews</h2>

{product.reviews?.map(
  (review) => (
    <div
  key={review._id}
  className="review-card"
>
      <h4>{review.name}</h4>

      <p>⭐ {review.rating}</p>

      <p>{review.comment}</p>
    </div>
  )
)}
      <div className="review-section">

  <h2>Write Review</h2>

  <div className="review-form">

    <select
      value={rating}
      onChange={(e) =>
        setRating(e.target.value)
      }
    >
      <option value="5">
        ⭐⭐⭐⭐⭐
      </option>

      <option value="4">
        ⭐⭐⭐⭐
      </option>

      <option value="3">
        ⭐⭐⭐
      </option>

      <option value="2">
        ⭐⭐
      </option>

      <option value="1">
        ⭐
      </option>
    </select>

    <textarea
      placeholder="Write your review..."
      value={comment}
      onChange={(e) =>
        setComment(e.target.value)
      }
    />

    <button
      className="review-btn"
      onClick={submitReview}
    >
      Submit Review
    </button>

  </div>

</div>
      </div>

    </div>
  );
}

export default ProductDetails;