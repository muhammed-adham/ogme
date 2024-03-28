import React from "react";
import { Link, NavLink } from "react-router-dom";

const Banner = ({ videoSrc, imgSrc, currentPage }) => {
  return (
    <>
      <section className="banner">
        {videoSrc ? (
          <video src={videoSrc} autoPlay muted loop></video>
        ) : (
          <img src={imgSrc} alt="banner image" />
        )}
        <div className="crumbs-container">
          <h1>{currentPage}</h1>
          <div className="crumbs">
            {currentPage ? (
              <>
                <Link to={"/"} onClick={()=>scroll(0, 0)}>home </Link>
                <span>- </span>
              </>
            ) : null}
            <NavLink>{currentPage}</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
