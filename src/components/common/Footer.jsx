import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

/** === Footer ===
 * 
 * This component represents a footer section
 * 
 * Layout:
 * - Footer: The main container for the footer section.
 *  - .form-footer: Container for the footer contents.
 *    - title: Container for the title of the form-footer.
 *      - h2: The heading element for the title.
 *      - p: The paragraph element for description.
 *    - .email-input: Container for input
 *      - <input>: The input field for email
 *   - widgets: Container for footer widgets.
 *     - social-icons: Container for social media icons.
 *       - Link: The link element for each social media icon.
 *         - Svg: The SVG icon for the social media platform
 *     - terms: Container for the terms link
 *       - Link: The link element for terms
*/
const Footer = () => {

  //Term Links
  const termLinks = [
    { path: "/policy", label: "Policy" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/fqa", label: "FAQ" }
  ];

  //========================================================================================Handle input Data ForMobile
  const [inputData,setInputData]=useState({
    email: "",
  })
  const onInputHandler=(e)=>{
    setInputData({
      ...inputData,
      [e.target.name]:e.target.value
    })
  }
  //==================================================================Return======================================================//
  return (
    <footer>
      <div className="form-footer">
        <div className="title">
          <h2>never miss a thing</h2>
          <p>
            Sign up to our art letter for early access to promotion, new drop’s,
            updates and more
          </p>
        </div>
        <div className="email-input">
          <input type="email" placeholder="Enter your email" onInput={onInputHandler} value={inputData.name}/>
          <HiOutlineMail />
        </div>
      </div>
      <div className="widgets">
        <div className="social-icons">
          <Link to={"https://www.facebook.com/ogmeofficial"} target="blank" className="icon-container">
            <FaFacebookF />
          </Link>
          <Link to={"https://www.instagram.com/ogmestore/"} target="blank" className="icon-container">
            <FaInstagram />
          </Link>
          <Link to={"https://www.tiktok.com/@ogmeofficial?_t=8l7YLc0ALQr&_r=1"} target="blank" className="icon-container">
            <FaTiktok />
          </Link>
        </div>
        <div className="terms">
          {termLinks.map((li,idx)=>(
            <Link key={idx} to={li.path} onClick={()=>scroll({left:0,top:0,behavior:"smooth"})}>{li.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
