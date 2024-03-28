import React from "react";
import ReactDom from "react-dom/client";
import "./styles/app.scss";
import App from "./App";
import MobileProvider from "./context/MobileContext";
import WishCountProvider from "./context/WishCountContext";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishCountProvider>
      <MobileProvider>
        <App />
      </MobileProvider>
    </WishCountProvider>
  </React.StrictMode>
);
