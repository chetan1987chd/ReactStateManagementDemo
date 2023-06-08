import React from "react";
import "./App.css";
import Products from "./Products";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import { useState } from "react";
import { useEffect } from "react";
import Checkout from "./Checkout";


export default function App() {

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (error) {
      console.error('The cart data cannot be parse');
      return [];
    }
  });

  useEffect(() =>
    localStorage.setItem("cart", JSON.stringify(cart)), [cart]
  );

  function addToCart(id, sku) {
    setCart((items) => {
      const itemsInCart = items.find((i) => i.sku === sku);
      if (itemsInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      else {
        return [...items, { id, sku, quantity: 1 }]
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity == 0) {
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) => i.sku === sku ? { ...i, quantity: quantity } : i);
    })
  }

  function emptyCart() {
    setCart([]);
  }


  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to my app</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQty={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
