import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";

const DialogLogout = ({onDialog}) => {

  const navigate=useNavigate()

  const {setWishCount}=useContext(WishCountContext)

  const logoutHandler=()=>{
    onDialog(false)
    setWishCount(0)
    Cookies.remove('token')
    history.replaceState(null, "", "/"),
    navigate('/')

  }
  return (
    <>
      <div className="dialog-container">
        <div className="dialog">
          <div className="message">
            <h2>are you sure you want to log out?</h2>
          </div>
            <div className="options">
              <div className="confirm btn-dialog" onClick={logoutHandler}>Log Out</div>
              <div className="cancel btn-dialog" onClick={()=>onDialog(false)}>Cancel</div>
            </div>
        </div>
      </div>
    </>
  );
};

export default DialogLogout;
