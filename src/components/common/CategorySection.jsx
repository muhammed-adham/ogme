import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useQuery } from "react-query";
import { getCategoryProducts } from "../../utils/axiosConfig";
// import {
//   IoIosArrowDropleftCircle,
//   IoIosArrowDroprightCircle,
// } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const CategorySection = ({
  sectionCategory,
  sectionTitle,
  sectionDescription,
  categoryPagePath,
}) => {
  //========================================================================================Variables
  const navigate = useNavigate();
  //========================================================================================fetch Data from API
  const { data } = useQuery(["Category", sectionCategory], () =>
    // for seacrh
    getCategoryProducts(sectionCategory)
  );

  //   const { data } = useQuery("Category", () =>
  //   getCategoryProducts(sectionCategory)
  // );

  const cardsLength = data?.data.length; //===>Cards Length

  //========================================================================================Cards Arrows Slide TranslateX Handler
  //========================================================================================States
  // const [translateIdx, setTranslateIdx] = useState(0);
  // const [cardsOnView, setCardsOnView] = useState(3);
  // const [arrowDisabled, setArrowDisabled] = useState(false);
  // //========================================================================================Functions
  // const rightArrowHandler = () => {
  //   setTranslateIdx(
  //     cardsLength - cardsOnView <= translateIdx
  //       ? translateIdx
  //       : (prev) => prev + 1
  //   );
  // };

  // const leftArrowHandler = () => {
  //   setTranslateIdx(translateIdx == 0 ? translateIdx : (prev) => prev - 1);
  // };

  // useEffect(() => {
  //   setArrowDisabled(cardsLength - cardsOnView <= translateIdx ? true : false); //===>Set Right Arrow Disable Class

  //   cardsContainer.current.scrollLeft = translateIdx * 392; //===>fixed TranslateX to Scroll cards onClick Arrows
  // }, [translateIdx]);

  //========================================================================================Cards Drag Slide TranslateX Handler
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(null);
  const [mouseMoved, setMouseMoved] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const cardsContainer = useRef();

  const mouseDownHandler = (e) => {
    setMouseDown(true);
    if (e.pageX === undefined) {
      setStartX(e.touches[0].pageX - cardsContainer.current.offsetLeft); // mouse position Inside Container once TouchStart
    } else {
      setStartX(e.pageX - cardsContainer.current.offsetLeft); // mouse position Inside Container once clicked
    }
    setScrollLeftState(cardsContainer.current.scrollLeft);
    setMouseMoved(0);
  };

  const mouseMoveHandler = (e) => {
    if (!mouseDown) {
      return;
    }

    setIsDragging(true);

    const currentMousePositionInsideCardsContainer =
      e.pageX === undefined
        ? e.touches[0].pageX - cardsContainer.current.offsetLeft // //current Touch Position Inside Container While Moving
        : e.pageX - cardsContainer.current.offsetLeft; // //current Mouse Position Inside Container While Moving

    setMouseMoved(currentMousePositionInsideCardsContainer - startX);
  };

  useEffect(() => {
    //thats what makes the effect take place// repostion the draggable container
    cardsContainer.current.scrollLeft = scrollLeftState - mouseMoved;
  }, [mouseDown, startX, scrollLeftState, mouseMoved]);

  useEffect(() => {
    // active mouse click after drag end
    setIsDragging(false);
  }, [mouseDown]);

  //=============================================================Return=================================================================//
  return (
    <>
      <div className="container">
        <section className="home-section">
          <div className="title">
            <h2>{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>
          <div className="cards-container">
            <div
              className={`cards ${mouseDown ? "active-swipe" : null}`}
              ref={cardsContainer}
              onMouseDown={(e) => mouseDownHandler(e)}
              onMouseUp={() => setMouseDown(false)}
              onMouseLeave={() => setMouseDown(false)}
              onMouseMove={(e) => {
                mouseMoveHandler(e);
              }}
              onTouchStart={(e) => mouseDownHandler(e)}
              onTouchEnd={() => {
                setMouseDown(false);
              }}
              onTouchCancel={() => {
                setMouseDown(false);
              }}
              onTouchMove={(e) => {
                mouseMoveHandler(e);
              }}
            >
              {data?.data.map((prd, idx) => {
                if (idx <= 4)
                  return (
                    <Card
                      isDragging={isDragging}
                      key={idx}
                      productName={prd.productName}
                      price={
                        prd.price - (prd.onSale.percentage / 100) * prd.price
                      }
                      oldPrice={prd.onSale.active ? prd.price : null}
                      productImage={prd.images}
                      onClick={() => {
                        isDragging
                          ? null
                          : (navigate(`/shop/${prd.category}/${prd.id}`),
                            scroll(0, 0));
                      }}
                      // onClick={clickHandler}
                    />
                  );
              })}
            </div>
          </div>
          <Link
            to={categoryPagePath}
            className="btn"
            onClick={() => scroll(0, 0)}
          >
            view all products
          </Link>
          {/* <div className="arrows">
            <IoIosArrowDropleftCircle
              className={translateIdx == 0 ? "disabled" : null}
              onClick={leftArrowHandler}
            />
            <IoIosArrowDroprightCircle
              className={arrowDisabled ? "disabled" : null}
              onClick={rightArrowHandler}
            />
          </div> */}
        </section>
      </div>
    </>
  );
};

export default CategorySection;
