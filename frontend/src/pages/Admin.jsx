  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  function Admin() {
    const [countInStock, setCountInStock] =
  useState("");
    const [stats, setStats] =
  useState(null);

   const navigate = useNavigate();

useEffect(() => {
  const fetchStats = async () => {

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  const { data } =
    await axios.get(
      "http://localhost:5000/api/orders/stats/dashboard",
      {
        headers: {
          Authorization:
            `Bearer ${userInfo.token}`,
        },
      }
    );

  setStats(data);
};
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (!userInfo?.isAdmin) {
      navigate("/");
      return;
    }

    fetchProducts();
    fetchStats();
  }, []);

    const [editingId, setEditingId] =
    useState(null);
    const editHandler = (product) => {
    setEditingId(product._id);
      setCountInStock(
  product.countInStock
);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setPrice(product.price);
    setImage(product.image);

    setSpecs(
      product.specs.join(",")
    );
  };
  const updateProduct = async () => {
    try {
    const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );
  await axios.put(
    `http://localhost:5000/api/products/${editingId}`,
   {
  name,
  brand,
  category,
  price,
  image,
  countInStock,
  specs: specs.split(","),
},
    {
      headers: {
        Authorization:
          `Bearer ${userInfo.token}`,
      },
    }
  );

      fetchProducts();

      setEditingId(null);

      setName("");
      setBrand("");
      setCategory("");
      setPrice("");
      setImage("");
      setSpecs("");

    } catch (error) {
      console.error(error);
    }
  };
    const [name, setName] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  const [specs, setSpecs] =
    useState("");
    const addProduct = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.post(
        "http://localhost:5000/api/products",
       {
  name,
  brand,
  category,
  price,
  image,
  countInStock,
  specs: specs.split(","),
},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchProducts();

      setName("");
      setBrand("");
      setCategory("");
      setPrice("");
      setImage("");
      setSpecs("");

    } catch (error) {
      console.error(error);
    }
  };
    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] =
  useState("");

    const deleteHandler = async (id) => {
    try {
    const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  await axios.delete(
    `http://localhost:5000/api/products/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${userInfo.token}`,
      },
    }
  );

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

   const fetchProducts = async () => {
  try {
    const { data: productsData } =
      await axios.get(
        "http://localhost:5000/api/products"
      );

    setProducts(productsData);

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const { data: statsData } =
      await axios.get(
        "http://localhost:5000/api/orders/stats/dashboard",
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

    setStats(statsData);

  } catch (error) {
    console.error(error);
  }
};
    const filteredProducts =
  products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );
    return (
      
  <div className="admin-page">  
      <h1>🛠️ Admin Dashboard</h1>
        {stats && (
  <div
    className="dashboard-stats"
  >

    <div
      className="dashboard-card"
    >
      <h2>
        {stats.products}
      </h2>
      <p>Products</p>
    </div>

    <div
      className="dashboard-card"
    >
      <h2>
        {stats.orders}
      </h2>
      <p>Orders</p>
    </div>

    <div
      className="dashboard-card"
    >
      <h2>
        {stats.users}
      </h2>
      <p>Users</p>
    </div>

    <div
      className="dashboard-card"
    >
      <h2>
        ₹
        {stats.revenue.toLocaleString()}
      </h2>
      <p>Revenue</p>
    </div>

  </div>
)}
<div className="admin-stats">
  <div className="stat-card">
    <h2>{products.length}</h2>
    <p>Total Products</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        new Set(
          products.map(
            (p) => p.category
          )
        ).size
      }
    </h2>
    <p>Categories</p>
  </div>
</div>
<h2 className="admin-form-title">
  {editingId
    ? "Edit Product"
    : "Add Product"}
</h2>
  <div className="admin-form">
  <input
    placeholder="Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
  />

  <input
    placeholder="Brand"
    value={brand}
    onChange={(e) =>
      setBrand(e.target.value)
    }
  />

  <input
    placeholder="Category"
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
  />

  <input
    placeholder="Price"
    value={price}
    onChange={(e) =>
      setPrice(e.target.value)
    }
  />
  <input
  placeholder="Stock Quantity"
  value={countInStock}
  onChange={(e) =>
    setCountInStock(e.target.value)
  }
/>
  <input
    placeholder="Image Path"
    value={image}
    onChange={(e) =>
      setImage(e.target.value)
    }
  />

  <input
    placeholder="Specs separated by commas"
    value={specs}
    onChange={(e) =>
      setSpecs(e.target.value)
    }
  />

  {editingId ? (
    <button
      onClick={updateProduct}
    >
      Update Product
    </button>
  ) : (
    <button
      onClick={addProduct}
    >
      Add Product
    </button>
  )}
</div>  
  <hr />

<input
  className="admin-search"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

<div className="admin-products">
  {filteredProducts.map((product) => (
    <div
      key={product._id}
      className="admin-product-card"
    >
      <img
  src={product.image}
  alt={product.name}
  className="admin-product-image"
/>
      <h3>{product.name}</h3>

      <p>{product.brand}</p>

<p className="admin-category">
  {product.category}
</p>

      <h4>
        ₹{product.price.toLocaleString()}
      </h4>
      <p>
  Stock:
  {product.countInStock}
</p>
      <div className="admin-actions">
        <button
          onClick={() =>

            editHandler(product)
          }
        >
          Edit
        </button>

        <button
  className="delete-btn"
  onClick={() => {
    if (
      window.confirm(
        "Delete this product?"
      )
    ) {
      deleteHandler(product._id);
    }
  }}
>
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

</div>
);
  }

  export default Admin;