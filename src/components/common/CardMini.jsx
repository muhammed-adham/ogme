import React from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
  minusBtn
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
          <AiOutlinePlus onClick={plusBtn}/>
          {quantity}
          <AiOutlineMinus onClick={minusBtn}/>
        </div>
        <div className="prd-price">
          <span>
            <b>
            EGP {price}
            </b>
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
