import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { BsHandbag } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { WishCountContext } from "../../context/WishCountContext";
import { getCartlistProducts } from "../../utils/axiosConfig";
import { useQuery } from "react-query";
import SearchDialog from "./SearchDialog";

const Header = () => {
  //========================================================================================Search Handler
  const[searchDialog,setSearchDialog]=useState(false)
  const Close=(Close)=>{
    setSearchDialog((prev)=>prev=Close)
  }
  //========================================================================================cartListProducts
  const {data:cartlistProducts}=useQuery("cartlistProducts",getCartlistProducts)

  useEffect(()=>{
    setWishCount(cartlistProducts?.data.length)
  },[cartlistProducts])
  //========================================================================================Variables
  const navigate = useNavigate();
  const { wishCount,setWishCount } = useContext(WishCountContext);
  
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
            <div className="search" onClick={()=>{setSearchDialog((prev)=>!prev)}}>
              <IoIosSearch />
            </div>
            {Cookies.get("token") ? (
              <>
                <div className="cart-icon">
                  <NavLink to={"/cartlist"} className="cart">
                    <BsHandbag />
                  </NavLink>
                  {wishCount > 0 ? <span>{wishCount}</span> : null}
                </div>
                <div className="profile" onClick={()=>{navigate('/account/orders')}}>
                  <img src="/images/pp.jpg" alt="profile picture" />
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
      {searchDialog?
        <SearchDialog CloseEvent={Close}/>
      :null}
    </>
  );
};

export default Header;
