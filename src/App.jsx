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
import { useReducer } from "react";
import cartReducer from "./cartReducer";


let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (error) {
  console.error('The cart data cannot be parse');
  initialCart = [];
}

export default function App() {

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to my app</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail dispatch={dispatch} />} />
            <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />} />
            <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
