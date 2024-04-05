import React from "react";
import Banner from "../common/Banner";
import CategorySection from "../common/CategorySection";
import { Link } from "react-router-dom";

/** === Home Page ===
 *
 * This component represents the Home Page
 * it displays diffrent category sections with title ,card and a view all button
 * 
 *
 */
const Home = () => {

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner videoSrc={"images/banner/main-banner.MP4"}/>

      <CategorySection
      categoryPagePath={"/shop/drive"}
      sectionCategory={"drive"}
        sectionTitle={"Ogme Drive"}
        sectionDescription={
          "Lorem, ipsum dolor sit amet consectetur adipisicing."
        }
      />
      <CategorySection
      categoryPagePath={"/shop/bottles"}
      sectionCategory={"bottles"}
        sectionTitle={"Ogme bottles"}
        sectionDescription={
          "Lorem, ipsum dolor sit amet consectetur adipisicing."
        }
      />
      <CategorySection
      categoryPagePath={"/shop/glassware"}
      sectionCategory={"glassware"}
        sectionTitle={"Ogme glassware"}
        sectionDescription={
          "Lorem, ipsum dolor sit amet consectetur adipisicing."
        }
      />
      <section className="meet-artist" style={{backgroundImage:"url(/images/banner/artist.jpg)"}}>
        <h2>meet the artist</h2>
        <Link to={"/about"} onClick={() => scroll(0,580)} className="btn">read more</Link>
      </section>
    </>
  );
};

export default Home;
