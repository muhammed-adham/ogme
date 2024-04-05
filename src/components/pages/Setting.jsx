import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetUserData, patchUserData } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

/** === Setting Page ===
 *
 * This component represents the Setting page.
 *
 * Layout:
 * - .setting-page: The main container for the Setting page.
 *   - .container-setting: The container for the page content.
 *     - .profile.info-container: Container for the profile information section.
 *       - .title: Container for the title "profile information".
 *         - <h2>: The title "profile information".
 *       - .form-container: Container for the profile information form.
 *         - <form>: The profile information form.
 *           - <input>: Input field for the user's name.
 *           - <input>: Input field for the user's email.
 *           - <input>: Input field for the user's phone number.
 *     - .address.info-container: Container for the address section.
 *       - .title: Container for the title "address".
 *         - <h2>: The title "address".
 *       - .form-container: Container for the address form.
 *         - <form>: The address form.
 *           - <input>: Input field for the user's address.
 *           - <input>: Input field for the user's city.
 *           - <input>: Input field for the building number.
 *           - <input>: Input field for the floor number.
 *           - <input>: Input field for the apartment number.
 *     - <input>: Submit button for saving the changes made in the profile information and address forms.
 */
const Setting = () => {
  //========================================================================================GetUser Data from Api
  const [stateUserData, setStatUsereData] = useState();

  const { data: userData } = useQuery("getUserData", GetUserData);

  useEffect(() => {
    setStatUsereData(userData?.data);
  }, [userData]);
  //========================================================================================Handle Form Submit
  const enterKeyHandler = (e) => {
    e.key === "Enter" ? submitHandler(e) : null;
  };
  
  // const [newUserData,setNewUserData]=useState()
  const onChangeHandler = (e) => {
    setStatUsereData({
      ...stateUserData,
      [e.target.name]: e.target.value,
    });
};

const submitHandler = (e) => {
    e.preventDefault(); 
    patchUserData(stateUserData)
    toast.success('Updated Successfully')
  }

  //==================================================================Return========================================================//
  return (
    <>
      <div className="setting-page">
        <div className="container-setting">
          <div className="profile info-container">
            <div className="title">
              <h2>profile information</h2>
            </div>
            <div className="form-container">
              <form action="" >
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData?.name}
                  name="name"
                  id="name"
                  type="text"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData?.email}
                  name="email"
                  id="email"
                  type="text"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData?.phone}
                  name="phone"
                  id="phone"
                  type="text"
                />
              </form>
            </div>
          </div>
          <div className="address info-container">
            <div className="title">
              <h2>address</h2>
            </div>
            <div className="form-container">
              <form action="">
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData!==null?stateUserData?.address:null}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Address"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData!==null?stateUserData?.city:null}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData!==null?stateUserData?.bulding:null}
                  name="bulding"
                  id="bulding"
                  type="text"
                  placeholder="Bulding No"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData!==null?stateUserData?.floor:null}
                  name="floor"
                  id="floor"
                  type="text"
                  placeholder="Floor No"
                />
                <input onKeyDown={enterKeyHandler} onChange={onChangeHandler}
                  defaultValue={stateUserData!==null?stateUserData?.apt:null}
                  name="apt"
                  id="apt"
                  type="text"
                  placeholder="Apartment No"
                />
              </form>
            </div>
          </div>
          <input onKeyDown={enterKeyHandler} type="submit" value={"save all"} onClick={submitHandler}/>
        </div>
      </div>
    </>
  );
};

export default Setting;
