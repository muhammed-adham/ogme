import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const termLinks = [
    { path: "/policy", label: "Policy" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/fqa", label: "FAQ" }
  ];
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
          <input type="email" placeholder="Enter your email" />
          {/* <p>Enter your email</p> */}
          <HiOutlineMail />
        </div>
      </div>
      <div className="widgets">
        <div className="social-icons">
          <Link to={"https://www.facebook.com/"} target="blank" className="icon-container">
            <FaFacebookF />
          </Link>
          <Link to={"https://www.instagram.com/"} target="blank" className="icon-container">
            <FaInstagram />
          </Link>
          <Link to={"https://www.tiktok.com/en/"} target="blank" className="icon-container">
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
