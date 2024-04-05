import React from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

/** MiniCard ==> /CartPage
 *
 * This Component represents a mini card
 * it displays product information in a compact format
 *
 * Usage:
 * - Cart Page
 *
 * Layout:
 * - .card-mini-container: The main container for the mini card element
 *  - .prd-img: Container for the product image
 *    - <img>: The image displayed within the mini card
 *  - .prd-info: Container for the product information
 *    - .prd-name: Container for the product name
 *      - <b>: bold text for the product name
 *    - .prd-cat: Container for the product category
 *  - .quan: Container for the quantity information
 *    - <svg>: icon for plus and minus
 *    - <p>: text for qauntity
 *  - .prd-price: Container for the product price
 *    - <span>: Outer container for the price
 *      - <b>: bold text for price
 *      - <del>: strikethrought text for the discounted price
 *  - .delete-btn: Button for deleting the product from the cart
 */
const CardMini = ({
  productImageSrc,
  productName,
  productCategory,
  quantity,
  price,
  oldPrice,
  removeItem,
  onClick,
  plusBtn,
  minusBtn,
}) => {
  //=================================================================Return=========================================================//
  return (
    <>
      <div className="card-mini-container">
        <div className="prd-img" onClick={onClick}>
          <img src={productImageSrc[0]} alt="product image" />
        </div>
        <div className="prd-info">
          <div className="prd-name">
            <b>{productName}</b>
          </div>
          <div className="prd-cat">Ogme {productCategory}</div>
        </div>
        <div className="quan">
          <AiOutlinePlus onClick={plusBtn} />
          {quantity}
          <AiOutlineMinus onClick={minusBtn} />
        </div>
        <div className="prd-price">
          <span>
            <b>EGP {price}</b>
            <del>
              {oldPrice ? "EGP" : null} {oldPrice}
            </del>
          </span>
        </div>
        <div className="delete-btn" onClick={removeItem}>
          <TiDelete />
        </div>
      </div>
    </>
  );
};

export default CardMini;
