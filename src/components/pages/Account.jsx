import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import DialogLogout from "../common/DialogLogout";
import Cookies from "js-cookie";

/* 
/** === Account Page ===
 *
 * This component represents the ِccount page.
 *
 * Layout:
 * - .account-page: The main container for the account page.
 *   - .container: The container for the account page contents.
 *     - .side-bar: The container for the side bar.
 *       - .profile-picture: The container for the profile picture.
 *         - <img>: The image element for the profile picture.
 *       - .side-nav: The container for the side navigation.
 *         - .nav-group: The container for each navigation group.
 *           - <NavLink>: The link element for each navigation item.
 *             - .icon: The container for the icon associated with the navigation item.
 *             - text: The text for the navigation item.
 *       - .log-out-btn: The button element for logging out.
 *     - <Outlet>: The component representing the outlet for Setting Page and MyOrders Page.
 *     - <DialogLogout>: The dialog component for logging out.
 */
const Account = () => {

    //========================================================================================Variables
    const [dialog, setDialog] = useState(false);
    const Close = (e) => {
      setDialog((prev) => (prev = e));
    };

    //========================================================================================Handlers
  const logoutHandler = () => {
    setDialog((prev) => !prev);
  };

  //=============================================================Return==============================================================//
  return (
    <>
      {Cookies.get("token") ? (
        <>
          <section className="account-page">
            <div className="container">
              <div className="side-bar">
                <div className="profile-picture">
                  <img src="/images/logo-white.jpg" alt="profile picture" />
                </div>
                <div className="side-nav">
                  <div className="nav-group">
                    <NavLink to={"/account/orders"}>
                      <div className="icon">
                        {" "}
                        <BsHandbag />
                      </div>
                      My Orders
                    </NavLink>
                  </div>
                  <div className="nav-group">
                    <NavLink to={"/account/setting"}>
                      <div className="icon">
                        <CiSettings />
                      </div>
                      Account settings
                    </NavLink>
                  </div>
                  <div className="log-out-btn" onClick={logoutHandler}>
                    log out
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </section>
          {dialog ? <DialogLogout onDialog={Close} /> : null }
        </>
      ) : null}
    </>
  );
};

export default Account;
