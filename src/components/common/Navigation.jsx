import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const navLinks = [
    { path: "/", label: "home" },
    { path:"/shop", label: "shop" },
    { path: "/sale", label: "on sale" },
    { path: "/about", label: "about us" },
    { path: "/policy", label: "policy" },
  ];

  const overlayLinks = [
    { path: "/shop/drive", label: "ogme drive" },
    { path: "/shop/bottles", label: "ogme bottles" },
    { path: "/shop/glassware", label: "ogme glassware" },
    { path: "/shop/suncatcher", label: "ogme suncatcher" },
  ];

  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  return (
    <>
      <nav>
        {navLinks.map((link, idx) => (
          <NavLink
            onClick={link.label == "shop" ? (e)=>{e.preventDefault()}:null}
            key={idx}
            to={link.path}
            onMouseEnter={link.label == "shop" ? mouseEnterHandler : null}
            onMouseLeave={link.label == "shop" ? mouseLeaveHandler : null}
            style={{ color: `${link.label == "on sale" ? "red" : null}` }}
          >
            {link.label}
            {idx == 1 && isHovered ? (
              <>
                <div className="overlay-container">
                  <div className="overlay">
                    {overlayLinks.map((li, idx) => (
                      <div key={idx} className="link-container">
                        <Link to={li.path} onClick={()=>scroll(0,0)}>
                          {li.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
