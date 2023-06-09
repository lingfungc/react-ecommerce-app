import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import Link from "next/link";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

import { TiDeleteOutline } from "react-icons/ti";

import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";

import { urlFor } from "../lib/client";

import getStripe from "../lib/getStripe";

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    showCart,
    setShowCart,
    onRemove,
    toggleCartItemQuantity,
  } = useStateContext();

  const cartRef = useRef(null);

  const [isClickedOutside, setIsClickedOutside] = useState(false);

  // useEffect(() => {
  const handleClickOutside = (event) => {
    // console.log(event);

    if (cartRef.current && !cartRef.current.contains(event.target)) {
      // setIsClickedOutside(true);
      setShowCart(false);
    } else {
      // setIsClickedOutside(false);
    }
  };

  // document.addEventListener("click", handleClickOutside);

  // return () => {
  //   document.removeEventListener("click", handleClickOutside);
  // };
  // }, []);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    // * Using .fetch() to make API request(s) to the backend
    // const response = await fetch("/api/stripe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(cartItems),
    // });

    // if (response.statusCode === 500) return;

    // const data = await response.json();

    // toast.loading("Redirecting to checkout page.");

    // stripe.redirectToCheckout({ sessionId: data.id });

    // * Using axios to make API request(s) to the backend
    // axios
    //   .post("/api/stripe", cartItems, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((response) => {
    //     toast.loading("Redirecting to checkout page.");
    //     stripe.redirectToCheckout({ sessionId: response.data.id });
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response.status);
    //     }
    //   });

    // * Using axios to make API request(s) to the backend with try/catch to handle error(s)
    try {
      const response = await axios.post("/api/stripe", cartItems, {
        headers: { "Content-Type": "application/json" },
      });

      toast.loading("Redirecting to checkout page.");
      stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      }
    }
  };

  return (
    <div className="cart-wrapper" onClick={handleClickOutside}>
      {/* Cart Header */}
      <div className="cart-container" ref={cartRef}>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {/* Empty Cart */}
        {/* {cartItems && ( */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} className="m-center" />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        {/* Products in Cart */}
        <div className="product-container">
          {/* {cartItems && */}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt={item?.name}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>£{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="quantity">
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Cart Footer */}
        {/* {cartItems && ( */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>£{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
