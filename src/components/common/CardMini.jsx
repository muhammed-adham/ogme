import React from "react";
import { TiDelete } from "react-icons/ti";

const CardMini = ({
  productImageSrc,
  productName,
  productCategory,
  quantity,
  price,
  oldPrice,
  removeItem,
  onClick,
}) => {
  //=================================================================Return=========================================================//
  return (
    <>
      <div className="card-mini-container" >
        <div className="prd-img" onClick={onClick}>
          <img src={productImageSrc[0]} alt="product image" />
        </div>
        <div className="prd-info">
          <div className="prd-name">
            <b>{productName}</b>
          </div>
          <div className="prd-cat">{productCategory}</div>
        </div>
        <div className="quan">{quantity}</div>
        <div className="prd-price">
          <span>
            {" "}
            <del>
              {oldPrice ? "EGP" : null} {oldPrice}
            </del>
            EGP {price}
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
