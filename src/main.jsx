import React from "react";
import ReactDom from "react-dom/client";
import "./styles/app.scss";
import App from "./App";
import TabletProvider from "./context/TabletContext";
import WishCountProvider from "./context/WishCountContext";
import MobileProvider from "./context/MobileContext";

ReactDom.createRoot(document.getElementById("root")).render(
  //My Contexts
  <React.StrictMode>
    <WishCountProvider>
      <TabletProvider>
        <MobileProvider>
        <App />
        </MobileProvider>
      </TabletProvider>
    </WishCountProvider>
  </React.StrictMode>
);
