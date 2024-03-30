import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import DialogLogout from "../common/DialogLogout";
import Cookies from "js-cookie";

const Account = () => {
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };
  const logoutHandler = () => {
    setDialog((prev) => !prev);
  };
  return (
    <>
      {Cookies.get("token") ? (
        <>
          <section className="account-page">
            <div className="container">
              <div className="side-bar">
                {/* <div className="page-title">
              <h2>My Account</h2>
            </div> */}
                <div className="profile-picture">
                  <img src="/images/pp.jpg" alt="profile picture" />
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
                  {/* <div className="nav-group">
                <NavLink to={"/account/setting"}>
                  <div className="icon">
                    <MdOutlineAccountCircle />
                  </div>
                  My details
                </NavLink>
              </div> */}

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
