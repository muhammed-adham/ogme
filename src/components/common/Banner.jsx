import React from "react";
import { Link, NavLink } from "react-router-dom";

/** === Banner ===
 *
 * This component represents a custom banner
 * It used to display either a video or an image and breadcrumb for sub-pages
 *
 * Usage:
 * - Shop Pages: This Banner is used in the Drive, Bottles, SunCatcher, Customize pages
 * - OnSale Page: This banner is used in the OnSale page to promote discounted or special offer items.
 *
 * Layout:
 * - .banner: The main container for the banner element
 *  - <video> or <img>: The main visual content section, displayin either a video or an image
 *  - .crumbs-container: The container for the breadcrumb navigation
 *    - .crumbs: Individual breadcrumb Elements
 *    - <Link>: Clickable link for each breadcrumb
 *    - <NavLink>: Special styling for the active breadcrumb
 */
const Banner = ({ videoSrc, imgSrc, currentPage }) => {
  //==================================================================Return======================================================//
  return (
    <>
      <section className="banner">
        {videoSrc ? (
          <video src={videoSrc} autoPlay={true} muted playsInline loop={true} controls={false}></video>
        ) : (
          <img src={imgSrc} alt="banner image" />
        )}
        <div className="crumbs-container">
          <h1>{currentPage}</h1>
          <div className="crumbs">
            {currentPage ? (
              <>
                <Link to={"/"} onClick={() => scroll(0, 0)}>
                  home{" "}
                </Link>
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
