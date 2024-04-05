import React, { useContext } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { TabletContext } from "../context/TabletContext";
import HeaderMob from "./common/HeaderMob";
import Menu from "./common/Menu";

/** === Layout ===
 *
 * This component represents the Single Page Application.
 */
const Layout = () => {
  const { isTablet } = useContext(TabletContext);

  //=============================================================Return=================================================================//
  return (
    <>
      {isTablet ? (
        <>
          <HeaderMob />
          <Menu />
        </>
      ) : (
        <Header />
      )}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
