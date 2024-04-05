import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import { useQuery } from "react-query";
import { getAllProducts } from "../../utils/axiosConfig";
import Card from "../common/Card";
import { useNavigate } from "react-router-dom";

/** === Onsale Category Page ===
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
const OnSale = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  //========================================================================================Fetch Data
  const { data, isSuccess } = useQuery("OgmeProducts",getAllProducts);

  const [onSaleProducts,setOnSaleProducts]=useState()

  useEffect(()=>{
    if(isSuccess){

      setOnSaleProducts(data?.data)
    }
  },[data])

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner
        currentPage={"on sale"}
        imgSrc={"/images/banner/banner-onsale.jpg"}
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
              {onSaleProducts?.map((prd, idx) => {
                if (prd.onSale.active == true) {
                  return (
                    <Card
                      key={idx}
                      productName={prd.productName}
                      productImage={prd.images}
                      price={
                        prd.price - (prd.onSale.percentage / 100) * prd.price
                      }
                      oldPrice={prd.price}
                      onClick={() => {
                        navigate(`/shop/${prd.category}/${prd.id}`),
                          scroll(0, 0);
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnSale;
