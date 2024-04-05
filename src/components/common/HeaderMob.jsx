import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { WishCountContext } from "../../context/WishCountContext";
import { useQuery } from "react-query";
import { getCartlistProducts } from "../../utils/axiosConfig";

const HeaderMob = () => {
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
      <header className="header-mob">
        <div className="container">
          <div className="account">
            {Cookies.get("token") ? (
              <>
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
                {/* <span>/</span> */}
                {/* <NavLink to={"/register"}>register</NavLink> */}
              </div>
            )}
          </div>
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="cart-icon">
            <NavLink to={"/cartlist"} className="cart">
              <BsHandbag />
            </NavLink>
            {wishCount > 0 ? <span>{wishCount}</span> : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMob;
