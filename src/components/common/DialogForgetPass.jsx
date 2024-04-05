import React from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

/** === DialogForget Password === 
 * 
 * This componeny represent a dialog box used to reset user password
 * It displays two options for recover or Cancel
 *
 * Usage:
 * - Login Page
 *
 * Layout:
 * - .dialog-address-container: The main container for the dialog element
 *  - .dialog: Container for the dialog contents
 *    - .message: Container for the message displayed in the dialog
 *      - <h2>: The heading element for the message
 *    - options: Container for the dialog options
 *      - btn-dialog: The button element representing each dialog option
 */
const DialogForgetPass = ({onDialog}) => {
  //========================================================================================Variables
//   const navigate = useNavigate();

  //========================================================================================Handler
  //GoToSetting Action
  const addressDialogHandler = () => {
    onDialog(false);
    toast.success('Password reset email sent')
    // navigate("/account/setting");
  };
  return (
    <>
      <div className="dialog-reset-container">
        <div className="dialog">
          <div className="message">
            <h2>Forget Your Password?</h2>
          </div>
          <input type="email" placeholder="Enter your email.."/>
          <div className="options">
            <div className="confirm btn-dialog" onClick={addressDialogHandler}>
              Reset
            </div>
            <div className="cancel btn-dialog" onClick={() => onDialog(false)}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogForgetPass;
