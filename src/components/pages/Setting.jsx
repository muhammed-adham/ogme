import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetUserData, patchUserData } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

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
    // console.log(stateUserData);
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
              </form>
            </div>
          </div>
          <input onKeyDown={enterKeyHandler} type="submit" value={"save all"} />
        </div>
      </div>
    </>
  );
};

export default Setting;
