import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let selectedProduct;
  let selectedProductIndex;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        setCartItems(updatedCartItems);
      });
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`Added ${qty} ${product.name} to the cart.`);

    // console.log(cartItems);
  };

  const onRemove = (id) => {
    selectedProduct = cartItems.find((item) => item._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - selectedProduct.price * selectedProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - selectedProduct.quantity
    );
  };

  const toggleCartItemQuantity = (id, value) => {
    selectedProduct = cartItems.find((item) => item._id === id);
    selectedProductIndex = cartItems.findIndex((item) => item._id === id);

    const newSelectedProduct = selectedProduct;

    // We use .filter() instead of .spice because the .filter() isn't a mutable function for state(s)
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      newSelectedProduct.quantity += 1;
      newCartItems.splice(selectedProductIndex, 0, newSelectedProduct);

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }

    if (value === "dec") {
      if (selectedProduct.quantity > 1) {
        newSelectedProduct.quantity -= 1;
        newCartItems.splice(selectedProductIndex, 0, newSelectedProduct);

        setCartItems(newCartItems);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - selectedProduct.price
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
