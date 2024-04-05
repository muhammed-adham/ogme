import React, { useEffect, useState } from "react";

/** === Card ===
 *
 * This component represents a default card
 * It displays product information image, description, price
 *
 * Usage:
 * - CategorySection :This Banner is used within the CategorySection component to present individual categories on the Home page.
 * - Shop Pages: This Banner is used in the Drive, Bottles, SunCatcher, Customize pages
 *
 * Layout:
 * - .card: The main container for the card element
 *  - .img-container: Container fot the image
 *    - <img>: The image displayed within the card
 *  - .desc: Container for the description and price
 *    - <p>: The paragraph element containing the product name
 *    - .price: The Price element
 */
const Card = ({
  productName,
  price,
  oldPrice,
  productImage,
  onClick,
  isDragging,
}) => {
  //========================================================================================States
  const [hovered, setHovered] = useState(false); //Mouse Hovering Over Card Image

  const [imgIdx, setImgIdx] = useState(0); //Images Index Controller

  const [intervalId, setIntervalId] = useState(null); // Global Interval Function

  //========================================================================================Handlers
  //  Hover Handler
  const handleHover = () => {
    setHovered((prev) => !prev);
  };

  //Change Card Image On Hover
  const startHoverInterval = () => {
    setImgIdx(imgIdx + 1);
    const id = setInterval(() => {
      setImgIdx((prevIndex) => {
        const nextIndex = prevIndex + 1; //Giving the state a variable so if statement can check it immediately//
        if (nextIndex >= 3) {
          setImgIdx(0);
        }
        return nextIndex; //The return refer to the setImgIdx value//
      });
    }, 2000);
    setIntervalId(id);
  };

  //========================================================================================UseEffect
  //Handle Image Change On Hover
  useEffect(() => {
    //Prevent Change Image while Dragging//
    if (hovered && !isDragging) {
      startHoverInterval();
    } else {
      clearInterval(intervalId);
      setImgIdx(0);
    }
  }, [hovered, isDragging]);

  //==================================================================Return======================================================//
  return (
    <>
      <div
        className="card"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={onClick}
      >
        <div className="img-container">
          <img
            draggable="false"
            src={productImage ? productImage[imgIdx] : null} // Prevent Delay Errors
            alt="product image"
            className="image-nd"
          />
        </div>
        <div className="desc">
          <p>{productName}</p>
          <div className="price">
            <span>
              <del>
                {oldPrice ? "EGP" : null} {oldPrice}
              </del>
              EGP {price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
