import React, { useContext, useEffect, useState } from "react";
import CardMini from "../common/CardMini";
import { IoCashOutline } from "react-icons/io5";
import { MdMobileFriendly } from "react-icons/md";
import { useQuery } from "react-query";
import {
  getCartlistProducts,
  removeProductCart,
} from "../../utils/axiosConfig";
import { WishCountContext } from "../../context/WishCountContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  //========================================================================================Variables
  const[subTotal,setSubTotal]=useState(0)

  //========================================================================================cartListCounterContext
  const { setWishCount } = useContext(WishCountContext);
  //========================================================================================handle data from axios
  const [CartProducts, setCartProducts] = useState();
  const { data: cartlistProducts } = useQuery(
    "getCartlistProducts",
    getCartlistProducts
  );
  //========================================================================================Calculate the total price
    const deleviryFee=50

  const calculateSubTotalPrice = () => {
    let totalPrice = 0;
    CartProducts.forEach((card) => {
      totalPrice += (card.data.price -
      (card.data.onSale.percentage / 100) * card.data.price)*card.quantity;
    });
    return totalPrice;
  };

  const calculateTotalPrice=()=>{
    let totalPrice=0
    totalPrice=calculateSubTotalPrice()+deleviryFee
    return totalPrice

  }
  
  //========================================================================================set Axios Data in State To render everChange
  useEffect(() => {
    setCartProducts(cartlistProducts?.data);
  }, [cartlistProducts]);

  //========================================================================================remove Item Handler
  const removeItemHandler = (cardId) => {
    // console.log(CartProducts.filter(prev=>prev.id != "ed0f"));
    removeProductCart(cardId);
    setWishCount((prev) => prev - 1);
    setCartProducts((prev) => prev.filter((item) => item.id != cardId));
  };
  //=================================================================Return=========================================================//
  return CartProducts?.length > 0 ? (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="card-list-container">
            <p>You have {CartProducts?.length} items in your cart</p>
            <div className="cards-container">
              <div className="cards">
                {CartProducts?.map((card, idx) => (
                  <CardMini
                    key={idx}
                    onClick={()=>{navigate(`/shop/${card.data.category}/${card.data.id}`),scroll(0,0)}}
                    productImageSrc={card.data.images}
                    productCategory={card.data.category}
                    productName={card.data.productName}
                    price={
                      card.data.price -
                      (card.data.onSale.percentage / 100) * card.data.price
                    }
                    oldPrice={card.data.onSale.active ? card.data.price : null}
                    removeItem={() => {
                      removeItemHandler(card.id);
                    }}
                    quantity={card.quantity}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="card-details-container">
            <h2>Payment Summary</h2>
            <div className="pay-methods-container">
              <b>Pay With</b>
              <div className="methods">
                <label className="method-container">
                  Insta Pay
                  <MdMobileFriendly />
                  <input type="radio" name="paymethod" />
                  <span className="check-mark"></span>
                </label>
                <label className="method-container">
                  Cash On Deliver
                  <IoCashOutline />
                  <input type="radio" name="paymethod" />
                  <span className="check-mark"></span>
                </label>
              </div>
            </div>
            <div className="pay-receipt-container">
              <div className="sub-total receipt-group">
                <p>SubTotal</p>
                <p>EGP {calculateSubTotalPrice()}</p>
              </div>
              <div className="delivery-fee receipt-group">
                <p>Delivery Fee</p>
                <p>EGP {deleviryFee}</p>
              </div>
              <div className="total receipt-group">
                <p>Total</p>
                <b>EGP {calculateTotalPrice()}</b>
              </div>
            </div>
            <div className="check-out">check out</div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      <section className="empty-cart">
        <h2>You cartlist is empty</h2>
        <div className="shop-btn" onClick={() => (navigate("/"),scroll(0,0))}>
          shop now
        </div>
      </section>
    </>
  );
};

export default Cart;
