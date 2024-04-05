import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import { axiosLoginUser, postNewUser } from "../../utils/axiosConfig";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DialogForgetPass from "../common/DialogForgetPass";

/** === Log Page ===
 *
 * This component represents a login page.
 *
 * Layout:
 * - .log-regist-page: The main container for the login and registration page.
 *   - .container: The container for the page content.
 *     - .title: The container for the page title and signup link.
 *       - <h2>: The heading element for the login title.
 *       - <p>: The paragraph element containing the signup link.
 *         - <Link>: The link to the registration page.
 *     - .form-container: The container for the login form.
 *       - .form: The login form element.
 *         - .form-group: The container for an input field.
 *           - <input>: The input field for the email address.
 *         - .form-group .form-pass: The container for the password input field.
 *           - <input>: The input field for the password.
 *           - .eye-icon: The container for the password visibility toggle.
 *             - FaEye or FaEyeSlash: The icon for showing or hiding the password.
 *         - <Link>: Link to Forget Password page
 *         - <input: The submit button for the login form.
 *       - <p>: The paragraph element for the "or" text.
 *       - .outh: The container for the external login options.
 *         - <GoogleLogin>: The component for logging in with Google.
 *         - <FacebookLogin>: The component for logging in with Facebook.
 *         - .apple-btn: The container for the Apple login button.
 *           - <AppleLogin>: The component for logging in with Apple.
 *     - .you-agree: The container for the Terms of Use and Privacy Policy links.
 *       - Link: The link to the Terms of Use page.
 *       - Link: The link to the Privacy Policy page.
 * */
const Login = () => {
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
    else if (userEmail.value !== 0 && userPassword.value !== 0) {
      axiosLoginUser(userData).then(() => {
        history.replaceState(null, "", "/"), //prevent go back after signup
          Cookies.get("token") ? navigate("/") : null;
        toast.success(`Welcome Back`);
      });
    }
  };

  //========================================================================================Handle input Data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //========================================================================================Dialog Handler
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };

  const logoutHandler = () => {
    setDialog((prev) => !prev);
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
              <Link className="forget-password" onClick={()=>setDialog(true)}>Forget password?</Link>
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
      {dialog ? <DialogForgetPass onDialog={Close} /> : null }
    </>
  );
};

export default Login;
