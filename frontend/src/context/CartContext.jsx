import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
      if (
    product.countInStock !== undefined &&
    product.countInStock <= 0
  ) {
    alert("Product is out of stock");
    return;
  }
  const existItem = cartItems.find(
    (item) => item._id === product._id
  );

  if (existItem) {
    setCartItems(
      cartItems.map((item) =>
        item._id === product._id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  } else {
    setCartItems([
      ...cartItems,
      {
        ...product,
        qty: 1,
      },
    ]);
  }
};
  const removeFromCart = (id) => {
  setCartItems(
    cartItems.filter(
      (item) => item._id !== id
    )
  );
};

const clearCart = () => {
  setCartItems([]);
};
const increaseQty = (id) => {
  setCartItems(
    cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            qty: item.qty + 1,
          }
        : item
    )
  );
};
const decreaseQty = (id) => {
  setCartItems(
    cartItems
      .map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
      .filter((item) => item.qty > 0)
  );
};
  return (
    <CartContext.Provider
value={{
  cartItems,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
};