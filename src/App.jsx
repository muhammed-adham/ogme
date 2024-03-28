import React from "react";
import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import OnSale from "./components/pages/OnSale";
import AboutUs from "./components/pages/AboutUs";
import Policy from "./components/pages/Policy";
import Drive from "./components/pages/Drive";
import Bottles from "./components/pages/Bottles";
import Glassware from "./components/pages/Glassware";
import Suncatcher from "./components/pages/Suncatcher";
import FAQ from "./components/pages/FAQ";
import Terms from "./components/pages/Terms";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleProduct from "./components/pages/SingleProduct";
import Ask from "./components/pages/Ask";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Cart from "./components/pages/Cart";
import Account from "./components/pages/Account";
import MyOrders from "./components/pages/MyOrders";
import Setting from "./components/pages/Setting";

const App = () => {
  const client = new QueryClient();

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/shop/drive", element: <Drive /> },
        { path: "/shop/bottles", element: <Bottles /> },
        { path: "/shop/glassware", element: <Glassware /> },
        { path: "/shop/suncatcher", element: <Suncatcher /> },
        { path: "/shop/:cat/:id", element: <SingleProduct /> },
        { path: "/sale", element: <OnSale /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/policy", element: <Policy /> },
        { path: "/fqa", element: <FAQ /> },
        { path: "/terms", element: <Terms /> },
        { path: "/ask", element: <Ask /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/cartlist", element: <Cart /> },
        // { path: "/orders", element: <Account /> },
        { path: "/account", element: <Account /> ,children:[
          {path: 'orders', element: <MyOrders/>},
          {path: 'setting', element: <Setting/>}
        ]},
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{style:{textTransform:'capitalize'}}}/>
      <QueryClientProvider client={client}>
        <GoogleOAuthProvider clientId="<your_client_id>">
          <RouterProvider router={Router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
