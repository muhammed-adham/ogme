import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import { postNewUser } from "../../utils/axiosConfig";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  //========================================================================================ShowPassword
  const [showPass, setShowPass] = useState();
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
    //========================================================================================if inputs Empty

    //========================================================================================Name
    if (userName.value == 0) {
      toast.error("please enter your full name");
      userName.classList.add("required");
    }
    //========================================================================================Email
    else if (userEmail.value == 0) {
      toast.error("please enter your email");
      userEmail.classList.add("required");
    }
    //========================================================================================Phone
    else if (userPhone.value == 0) {
      toast.error("please enter your phone number");
      userPhone.classList.add("required");
    }
    //========================================================================================Password
    else if (userPassword.value == 0) {
      toast.error("please enter a password");
      userPassword.classList.add("required");
    }

    //========================================================================================If Success
    else if (
      userName.value !== 0 &&
      userEmail.value !== 0 &&
      userPhone.value !== 0 &&
      userPassword.value !== 0
    ) {
      postNewUser(userData).then(() => {
        history.replaceState(null, "", "/"), //prevent go back after signup
          Cookies.get("token") ? navigate("/") : null;
          toast.success(`Welcome ${userData.name}`)
      });
    }
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
            <h2>sign up</h2>
            <p>
              Already Have an account?
              <Link to={"/login"}> log in</Link>
            </p>
          </div>
          <div className="form-container">
            <form action="" onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="name"
                  onChange={onChangeHandler}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="full name"
                />
              </div>
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
              <div className="form-group">
                <input
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="tel"
                  onChange={onChangeHandler}
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="mobile number"
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
                  type={showPass ? "text" : "password"}
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
              <input type="submit" value={"sign up"} />
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
            <p>
              By signing up, you agree to our{" "}
              <Link to={"/terms"} onClick={() => scroll(0, 0)}>
                Terms of Use
              </Link>{" "}
              and acknowledge you’ve read our{" "}
              <Link to={"/policy"} onClick={() => scroll(0, 0)}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
