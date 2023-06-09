import React from "react";
import { useReducer } from "react";
import cartReducer from "./cartReducer";
import { useEffect } from "react";
import { useContext } from "react";

const CartContext = React.createContext(null);

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (error) {
  console.error("The cart data cannot be parse");
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const contextValue = { cart, dispatch };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider." +
        "Wrap the parent component with it"
    );
  }
  return context;
}
