import React from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { useQuery } from "react-query";
import { getCategoryProducts } from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const Glassware = () => {
    //========================================================================================Variables
    const navigate=useNavigate()
  //========================================================================================Fetch Data
  const { data } = useQuery(["ogmeGlassware", "glassware"], () =>
    getCategoryProducts("glassware")
  );

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner
        imgSrc={"/images/banner/banner-glassware.jpg"}
        currentPage={"ogme glassware"}
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
              {data?.data.map((prd, idx) => (
                <Card
                  key={idx}
                  productName={prd.productName}
                  productImage={prd.images}
                  price={prd.price-(prd.onSale.percentage/100*prd.price)}
                  oldPrice={prd.onSale.active ? prd.price : null}
                  onClick={()=>{navigate(`/shop/${prd.category}/${prd.id}`),scroll(0,0)}}

                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Glassware;
