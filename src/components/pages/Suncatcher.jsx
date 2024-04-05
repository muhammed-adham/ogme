import React, { useContext } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CardXs from "../common/CardXs";
import { MobileContext } from "../../context/MobileContext";

/** === Suncatcher Category Page ===
 *
 * This component represents a category page.
 *
 * Layout:
 * - <Banner>: The customize banner component for the category page.
 * - .category-Page: The main container for the category page.
 *   - .container: The container for the page contents.
 *     - .title: The paragraph element for the page title.
 *     - .cards-container: The container for the cards displaying product information.
 *       - .cards: The container for individual product cards.
 *         - <Card>: The customize component representing a product card.
 *
 */
const Suncatcher = () => {
    //========================================================================================Variables
    const navigate=useNavigate()
    const{isMobile}=useContext(MobileContext)

  //========================================================================================Fetch Data
  const { data } = useQuery(["OgmeSuncatcher", "suncatcher"]);

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner
        imgSrc={"/images/banner/banner-suncatcher.jpg"}
        currentPage={"ogme suncatcher"}
      />
      <section className="category-page ogme-drive">
        <div className="container">
          <p className="title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            modi doloremque voluptates voluptate distinctio earum ullam iste qui
            fuga sint.
          </p>
          <div className="cards-container">
            <div className="cards">
              <h1>Coming Soon..</h1>
              {/* {data?.data.map((prd, idx) => (
                isMobile?
                <CardXs
                  key={idx}
                  productName={prd.productName}
                  productImage={prd.images}
                  price={prd.price-(prd.onSale.percentage/100*prd.price)}
                  oldPrice={prd.onSale.active ? prd.price : null}
                  onClick={()=>{navigate(`/shop/${prd.category}/${prd.id}`),scroll(0,0)}}

                />:
                                <Card
                  key={idx}
                  productName={prd.productName}
                  productImage={prd.images}
                  price={prd.price-(prd.onSale.percentage/100*prd.price)}
                  oldPrice={prd.onSale.active ? prd.price : null}
                  onClick={()=>{navigate(`/shop/${prd.category}/${prd.id}`),scroll(0,0)}}

                />
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Suncatcher;
