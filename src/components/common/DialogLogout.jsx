import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";

/** === DialogAddress === 
 * 
 * This componeny represent a dialog box used to ask user to provide addess details
 * It displays two options for Logout or Cancel
 *
 * Usage:
 * - Account Page
 *
 * Layout:
 * - .dialog-address-container: The main container for the dialog element
 *  - .dialog: Container for the dialog contents
 *    - .message: Container for the message displayed in the dialog
 *      - <h2>: The heading element for the message
 *    - options: Container for the dialog options
 *      - btn-dialog: The button element representing each dialog option
 */
const DialogLogout = ({onDialog}) => {

  //========================================================================================Variables
  const navigate=useNavigate()
  const {setWishCount}=useContext(WishCountContext)
  
  //========================================================================================Handlers
  //Clear All Data & GoTo HomePage
  const logoutHandler=()=>{
    onDialog(false)
    setWishCount(0)
    Cookies.remove('token')
    history.replaceState(null, "", "/"),
    navigate('/')
  }

  //==================================================================Return======================================================//
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
