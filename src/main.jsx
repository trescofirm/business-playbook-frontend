import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
<<<<<<< HEAD

import CookieConsent from "./components/CookieConsent";
=======
>>>>>>> origin/main

import "./index.css";

const paypalOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <PayPalScriptProvider options={paypalOptions}>
          <App />
<<<<<<< HEAD
          <CookieConsent />
=======
>>>>>>> origin/main
        </PayPalScriptProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);