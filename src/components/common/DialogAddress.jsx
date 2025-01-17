import React from "react";
import { useNavigate } from "react-router-dom";

/** === DialogAddress === 
 * 
 * This componeny represent a dialog box used to ask user to provide addess details
 * It displays two options for GoToSetting or Cancel
 *
 * Usage:
 * - Cart Page
 *
 * Layout:
 * - .dialog-address-container: The main container for the dialog element
 *  - .dialog: Container for the dialog contents
 *    - .message: Container for the message displayed in the dialog
 *      - <h2>: The heading element for the message
 *    - options: Container for the dialog options
 *      - btn-dialog: The button element representing each dialog option
 */
const DialogAddress = ({ onDialog }) => {
  //========================================================================================Variables
  const navigate = useNavigate();

  //========================================================================================Handler
  //GoToSetting Action
  const addressDialogHandler = () => {
    onDialog(false);
    navigate("/account/setting");
  };

  //==================================================================Return======================================================//
  return (
    <>
      <div className="dialog-address-container">
        <div className="dialog">
          <div className="message">
            <h2>Please provide your Address details!</h2>
          </div>
          <div className="options">
            <div className="confirm btn-dialog" onClick={addressDialogHandler}>
              Go to Settings
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

export default DialogAddress;
