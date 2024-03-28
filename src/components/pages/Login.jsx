import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import { axiosLoginUser, postNewUser } from "../../utils/axiosConfig";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    //========================================================================================ShowPassword
    const[showPass, setShowPass]=useState()
  //========================================================================================Variables
  const navigate = useNavigate();

  //========================================================================================Handle Submit on press enter
  const enterKeyHandler = (e) => {
    e.key === "Enter" ? submitHandler(e) : null;
  };
  //========================================================================================Handle Submit on click
  const submitHandler = (e) => {
    e.preventDefault();

    //========================================================================================userVariables
    const userName = document.getElementById("name");
    const userEmail = document.getElementById("email");
    const userPhone = document.getElementById("phone");
    const userPassword = document.getElementById("password");
    //========================================================================================if inputsEmpty

    //========================================================================================Email
    if (userEmail.value == 0) {
      toast.error("please enter your email");
      userEmail.classList.add("required");
    }

    //========================================================================================Password
    else if (userPassword.value == 0) {
      toast.error("please enter a password");
      userPassword.classList.add("required");
    }

    //========================================================================================If Success
    axiosLoginUser(userData).then(() => {
      history.replaceState(null, "", "/"), //prevent go back after signup
        Cookies.get("token") ? navigate("/") : null;
        
    });
  };

  //========================================================================================Handle input Data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //=============================================================Return=================================================================//
  return (
    <>
      <section className="log-regist-page">
        <div className="container">
          <div className="title">
            <h2>log in</h2>
            <p>
              Don't Have an account?
              <Link to={"/register"}> sign up</Link>
            </p>
          </div>
          <div className="form-container">
            <form action="" onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="email"
                  onChange={onChangeHandler}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="email adress"
                />
              </div>
              <div className="form-group form-pass">
                <input
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="off"
                  onChange={onChangeHandler}
                  name="password"
                  id="password"
                  type={showPass?"text":"password"}
                  placeholder="password"
                />
                <div
                  className="eye-icon"
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <input
                onKeyDown={enterKeyHandler}
                type="submit"
                value={"log in"}
              />
            </form>
            <p>or</p>
            <div className="outh">
              <GoogleLogin theme="outline" text="continue_with" />
              <FacebookLogin
                textButton="continue with facebook"
                appId="YOUR_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                buttonStyle={{
                  fontSize: ".75rem",
                  padding: ".75rem",
                  width: "100%",
                }}
                // callback={this.responseFacebook}
              />
              <div className="apple-btn">
                <AppleLogin
                  designProp={{
                    scale: 6,
                    height: 30,
                    width: 375,
                    type: "continue",
                  }}
                  // clientId="your-client-id"
                  // redirectURI="your-redirect-uri"
                  // responseType="code"
                  // responseMode="form_post"
                  // onSuccess={handleAppleLoginSuccess}
                  // onFailure={handleAppleLoginFailure}
                />
              </div>
            </div>
          </div>
          <div className="you-agree">
            <Link to={"/terms"} onClick={() => scroll(0, 0)}>
              Terms of Use
            </Link>{" "}
            <Link to={"/policy"} onClick={() => scroll(0, 0)}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
