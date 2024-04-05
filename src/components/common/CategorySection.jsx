import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useQuery } from "react-query";
import { getCategoryProducts } from "../../utils/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

/** === Category Section ===
 * 
 * This container represent a custom category section 
 * it used to display a section with title ,card and a view all button
 * 
 * Usasge:
 * - Home Page
 * 
 * Layout:
 * - container: The main container for the category section
 *  - .home-section: The container for the section content
 *    - .title: Container for the title of the section
 *      - <h2>: The heading element for the title
 *      - <p>: The paragraph element for the description
 *    - .cards-container: Container for the cards within the section
 *      - .cards: The cards displayed within the container
 *    - <Link>: The link element for navigating to more category-related content
*/
const CategorySection = ({
  sectionCategory,
  sectionTitle,
  sectionDescription,
  categoryPagePath,
}) => {

  //========================================================================================API
  const { data } = useQuery(["Category", sectionCategory], () =>
    getCategoryProducts(sectionCategory)
  );

  //========================================================================================Variables
  const navigate = useNavigate();

  //Data Length
  const cardsLength = data?.data.length; 

  //========================================================================================Handler
  //Cards Drag Handler
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(null);
  const [mouseMoved, setMouseMoved] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardsContainer = useRef(); //References To Div Cards

  //Mouse Down Handlers
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

  //Mouse Move Handlers
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

  //========================================================================================UseEffect
  //Makes the effect take place [repostion the draggable container]
  useEffect(() => {
    cardsContainer.current.scrollLeft = scrollLeftState - mouseMoved;
  }, [mouseDown, startX, scrollLeftState, mouseMoved]);

  // Active Mouse click after Drag end ==> CardComponent
  useEffect(() => {
    setIsDragging(false);
  }, [mouseDown]);

  //=============================================================Return==============================================================//
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
        </section>
      </div>
    </>
  );
};

export default CategorySection;
