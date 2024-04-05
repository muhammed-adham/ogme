import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { BsHandbag } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { WishCountContext } from "../../context/WishCountContext";
import { getCartlistProducts } from "../../utils/axiosConfig";
import { useQuery } from "react-query";

/** === Header ===
 *
 * This component represents a header section
 *
 * Layout:
 * - header: The main container for the header section.
 *  - .container: Container for the form-related header content.
 *    - .logo: Container for the logo image.
 *    - <Navigation>: A component for navigation links.
 *    - .account: The container for the account-related elements
 *      - .cart-icon: The container for the cart icon, which navigates to the cart list page
 *        - <NavLink>: The link element for the cart list page.
 *           - <svg>: The icon for the cart.
 *        - <span>: The span element displaying the count of items in the cart.
 *      - .profile: The container for the user profile picture, which navigates to the account orders page when clicked.
 *        - img: The image element for the profile picture.
 *      - log-regist: The container for the login and register links.
 *       - NavLink: The link element for the login page.
 *       - span: The span element for the separator ("/").
 *       - NavLink: The link element for the register page.
 */
const Header = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  const { wishCount, setWishCount } = useContext(WishCountContext);

  //========================================================================================API
  //CartProducts for Wish Counter
  const { data: cartlistProducts } = useQuery(
    "cartlistProducts",
    getCartlistProducts
  );

  //========================================================================================UseEffect
  //WishCounter
  useEffect(() => {
    //TotalCount DependOn Quantity of EachProduct in the Cart
    const totalQuantity = cartlistProducts?.data.reduce((total, product) => {
      const quantity = product.quantity;
      return total + quantity;
    }, 0);

    //Set WishCounter
    setWishCount(totalQuantity);
  }, [cartlistProducts]);

  //===============================================================Return===============================================================//
  return (
    <>
      <header>
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <Navigation />
          <div className="account">
            {Cookies.get("token") ? (
              <>
                <div className="cart-icon">
                  <NavLink to={"/cartlist"} className="cart">
                    <BsHandbag />
                  </NavLink>
                  {wishCount > 0 ? <span>{wishCount}</span> : null}
                </div>
                <div
                  className="profile"
                  onClick={() => {
                    navigate("/account/orders");
                  }}
                >
                  <img src="/images/logo-white.jpg" alt="profile picture" />
                </div>
              </>
            ) : (
              <div className="log-regist">
                <NavLink to={"/login"}>login</NavLink>
                <span>/</span>
                <NavLink to={"/register"}>register</NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
