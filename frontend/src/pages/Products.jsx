//import products from "../data/products";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Products() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortOption, setSortOption] =
  useState("default");
  
  const [searchTerm, setSearchTerm] =
  useState("");
  const [maxPrice, setMaxPrice] =
  useState("");

const [brand, setBrand] =
  useState("");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);
useEffect(() => {
  setCurrentPage(1);
}, [
  searchTerm,
  selectedCategory,
]);
  const [currentPage, setCurrentPage] =
  useState(1);
  const productsPerPage = 10;
 const categoryIcons = {
  Laptop: "💻",
  Mobile: "📱",
  Tablet: "📱",
  Audio: "🎧",
  Watch: "⌚",
  Camera: "📷",
  Monitor: "🖥️",
  Gaming: "🎮",
  Keyboard: "⌨️",
  Mouse: "🖱️",
  Storage: "💾",
  Printer: "🖨️",
  "Smart Speaker": "🔊",
  "Security Camera": "📹",
  Clothing: "👕",
  Footwear: "👟",
};
  const categories = [
  "All",
  ...new Set(
    products.map(
      (product) => product.category
    )
  ),
];
 const filteredProducts = products.filter(
  (product) => {

    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      product.brand
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const priceMatch =
      maxPrice === "" ||
      product.price <= Number(maxPrice);

    const brandMatch =
      brand === "" ||
      product.brand === brand;

    return (
      categoryMatch &&
      searchMatch &&
      priceMatch &&
      brandMatch
    );
  }
);
  const sortedProducts = [...filteredProducts];

if (sortOption === "lowToHigh") {
  sortedProducts.sort(
    (a, b) => a.price - b.price
  );
}

if (sortOption === "highToLow") {
  sortedProducts.sort(
    (a, b) => b.price - a.price
  );
}

const lastProduct =
  currentPage * productsPerPage;

const firstProduct =
  lastProduct - productsPerPage;

const currentProducts =
  sortedProducts.slice(
    firstProduct,
    lastProduct
  );
  
   

const totalPages = Math.ceil(
  sortedProducts.length / productsPerPage
);
  return (
    <div>
      <h1 className="products-title">
  All Products
</h1>

<h3
  style={{
    textAlign: "center",
    marginBottom: "20px",
    color: "#cbd5e1",
  }}
>
  {sortedProducts.length} Products Found
</h3>

<div className="search-container">

  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) =>
      setMaxPrice(e.target.value)
    }
  />

  <select
    value={brand}
    onChange={(e) =>
      setBrand(e.target.value)
    }
  >
    <option value="">
      All Brands
    </option>

    {[...new Set(
      products.map(
        (p) => p.brand
      )
    )].map((b) => (
      <option
        key={b}
        value={b}
      >
        {b}
      </option>
    ))}
  </select>

</div>
      <div className="sort-container">

  <label>Sort By: </label>

  <select
    value={sortOption}
    onChange={(e) =>
      setSortOption(e.target.value)
    }
  >
    <option value="default">
      Default
    </option>

    <option value="lowToHigh">
      Price: Low → High
    </option>

    <option value="highToLow">
      Price: High → Low
    </option>

  </select>

</div>
      <div className="products-layout">

        {/* Sidebar */}
        <div className="category-sidebar">

          <h2>Categories</h2>
        
          {categories.map((category) => (
  <button
    key={category}
    className={
      selectedCategory === category
        ? "active-category"
        : ""
    }
    onClick={() =>
      setSelectedCategory(category)
    }
  >
    {category !== "All" &&
      `${categoryIcons[category] || "📦"} `}
    {category}
  </button>
))}

        </div>

        {/* Products */}
        <div className="products-container">
          {currentProducts.length === 0 && (
  <h2
    style={{
      textAlign: "center",
      width: "100%",
      color: "#cbd5e1",
    }}
  >
    No products found 😔
  </h2>
)}
      {currentProducts.map((product) => (
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

    <h2>{product.name}</h2>

    <p className="brand">
      {product.brand}
    </p>

    <div className="rating">
      ⭐⭐⭐⭐⭐
      <span> 4.8 (0 Reviews)</span>
    </div>

    <ul>
      {product.specs
        .slice(0, 3)
        .map((spec, index) => (
          <li key={index}>
            ✓ {spec}
          </li>
        ))}
    </ul>

    <p className="price">
      ₹{product.price.toLocaleString()}
    </p>

    <div className="product-actions">
      <Link
        to={`/product/${product._id}`}
      >
        <button className="details-btn">
          View Details
        </button>
      </Link>
    </div>
  </div>
))}

        </div>
      </div>
      <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    &lt;
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      className={
        currentPage === index + 1
          ? "active-page"
          : ""
      }
      onClick={() =>
        setCurrentPage(index + 1)
      }
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    &gt;
  </button>

</div>
    </div>
  );
}

export default Products;