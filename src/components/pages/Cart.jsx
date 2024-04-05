import React, { useContext, useEffect, useState } from "react";
import CardMini from "../common/CardMini";
import { IoCashOutline } from "react-icons/io5";
import { MdMobileFriendly } from "react-icons/md";
import { useQuery } from "react-query";
import {
  GetUserData,
  getCartlistProducts,
  patchCartProduct,
  postUserOrder,
  removeProductCart,
} from "../../utils/axiosConfig";
import { WishCountContext } from "../../context/WishCountContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DialogAddress from "../common/DialogAddress";

/**
 *  * === CartPage ===
 *
 * This component represents the cart page.
 *
 * Structure:
 * - .cart-Page: The main container for the cart page.
 *   - .container: The container for the page contents.
 *     - .card-list-container: The container for the list of cart items.
 *       - <p>: Displays the number of items in the cart.
 *       - .cards-container: The container for individual cart item cards.
 *         - .cards: The container for individual cart item cards.
 *           - <CardMini>: The component representing a mini cart item card.
 *     - .card-details-container: The container for the cart payment summary.
 *       - <h2>: The heading element for the payment summary.
 *       - .pay-methods-container: The container for the payment methods.
 *         - <b>: The bold element for the "Pay With" label.
 *         - .methods: The container for individual payment method options.
 *           - .method-container: The container for a payment method option.
 *             - <input:> The radio button for the payment method option.
 *             - .check-mark: The check mark element for the selected payment method.
 *       - .pay-receipt-container: The container for the payment receipt.
 *         - .receipt-group: The container for the subtotal receipt.
 *           - <p>: The paragraph element for the subtotal label.
 *           - <p>: The paragraph element for the subtotal value.
 *         - .receipt-group: The container for the delivery fee receipt.
 *           - <p>: The paragraph element for the delivery fee label.
 *           - <p>: The paragraph element for the delivery fee value.
 *         - .receipt-group: The container for the total receipt.
 *           - <p>: The paragraph element for the total label.
 *           - <b>: The bold element for the total value.
 *       - .check-out: The button element for checking out.
 *     - DialogAddress: The component for the address input dialog.
 * - .empty-card: Container for content if cardlist is empty
 *
  */
const Cart = () => {
  //========================================================================================Dialog
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };
  const dialogHandler = () => {
    setDialog((prev) => !prev);
  };
  //========================================================================================Variables

  const navigate = useNavigate();

  //========================================================================================cartListCounterContext
  const { setWishCount, wishCount } = useContext(WishCountContext);

  //========================================================================================handle data from axios
  const [CartProducts, setCartProducts] = useState();

  const { data: cartlistProducts } = useQuery(
    "getCartlistProducts",
    getCartlistProducts
  );
  //========================================================================================Calculate Total Quantity
  useEffect(() => {
    const totalQuantity = cartlistProducts?.data.reduce((total, product) => {
      const quantity = product.quantity;
      return total + quantity;
    }, 0);

    setWishCount(totalQuantity);
  }, [cartlistProducts]);
  //========================================================================================Quantity Handler
  // const [updatedData,setUpdatedData]=useState()

  const plusBtn = (data) => {
    const update = { ...data, quantity: data.quantity + 1 };

    patchCartProduct(update);

    setWishCount((prev) => prev + 1);

    setCartProducts((prev) =>
      prev.map((prd) => (prd.id === data.id ? update : prd))
    );
  };

  const minusBtn = (data) => {
    if (wishCount > 1) {
      const update = { ...data, quantity: data.quantity - 1 };

      patchCartProduct(update);

      setWishCount((prev) => prev - 1);

      setCartProducts((prev) =>
        prev.map((prd) => (prd.id === data.id ? update : prd))
      );
    }
  };

  //========================================================================================Calculate the total price
  const deleviryFee = "Depends on your location";

  const calculateSubTotalPrice = () => {
    let totalPrice = 0;
    CartProducts.forEach((card) => {
      totalPrice +=
        (card.data.price -
          (card.data.onSale.percentage / 100) * card.data.price) *
        card.quantity;
    });
    return totalPrice;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    totalPrice = calculateSubTotalPrice();
    // +deleviryFee
    return totalPrice;
  };

  //========================================================================================set Axios Data in State To render everChange
  useEffect(() => {
    setCartProducts(cartlistProducts?.data);
  }, [cartlistProducts]);

  //========================================================================================remove Item Handler
  const removeItemHandler = (cardId, quantity) => {
    // console.log(CartProducts.filter(prev=>prev.id != "ed0f"));
    removeProductCart(cardId);
    setWishCount((prev) => prev - quantity);
    setCartProducts((prev) => prev.filter((item) => item.id != cardId));
  };

  //========================================================================================CheckOut Handler
  const { data: userData } = useQuery("userData", GetUserData);

  const checkoutHandler = () => {
    const user = userData?.data;
    if (
      !user.address ||
      !user.city ||
      !user.bulding ||
      !user.floor ||
      !user.apt
    ) {
      dialogHandler();
    } else {
      postUserOrder([...CartProducts], calculateTotalPrice()).then(() => {
        return(
          
          toast.success("your order has been processed"),
          CartProducts.map((el) => {
            removeProductCart(el.id)
          }),
          setCartProducts(null),
          setWishCount(0),
          navigate("/account/orders")
          )
        });
    }
  };

  //=================================================================Return=========================================================//
  return CartProducts?.length > 0 ? (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="card-list-container">
            <p>You have {wishCount} items in your cart</p>
            <div className="cards-container">
              <div className="cards">
                {CartProducts?.map((card, idx) => (
                  <CardMini
                    key={idx}
                    onClick={() => {
                      navigate(`/shop/${card.data.category}/${card.data.id}`),
                        scroll(0, 0);
                    }}
                    productImageSrc={card.data.images}
                    productCategory={card.data.category}
                    productName={card.data.productName}
                    price={
                      card.data.price -
                      (card.data.onSale.percentage / 100) * card.data.price
                    }
                    oldPrice={card.data.onSale.active ? card.data.price : null}
                    removeItem={() => {
                      removeItemHandler(card.id, card.quantity);
                    }}
                    quantity={card.quantity}
                    plusBtn={() => plusBtn(card)}
                    minusBtn={() => minusBtn(card)}
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
                  <input type="radio" name="paymethod" defaultChecked />
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
                <p>{deleviryFee}</p>
              </div>
              <div className="total receipt-group">
                <p>Total</p>
                <b>EGP {calculateTotalPrice()}</b>
              </div>
            </div>
            <div className="check-out" onClick={checkoutHandler}>
              check out
            </div>
          </div>
        </div>
      </section>
      {dialog ? <DialogAddress onDialog={Close} /> : null}
    </>
  ) : (
    <>
      <section className="empty-cart">
        <h2>You cartlist is empty</h2>
        <div className="shop-btn" onClick={() => (navigate("/"), scroll(0, 0))}>
          shop now
        </div>
      </section>
    </>
  );
};

export default Cart;
