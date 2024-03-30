import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getAllProducts,
  getCategoryProducts,
  getSingleProduct,
  postProductToCart,
} from "../../utils/axiosConfig";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsQuestionCircle, BsShareFill } from "react-icons/bs";
import Card from "../common/Card";
import { WishCountContext } from "../../context/WishCountContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const SingleProduct = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  const { wishCount, setWishCount } = useContext(WishCountContext);
  //========================================================================================Params
  const { id } = useParams();

  //========================================================================================Fetch Main Data
  const { data: singleProductData, isSuccess: successSingleProductData } =
    useQuery("singleProduct", () => getSingleProduct(id));
  const [stateData, setStateDate] = useState();

  useEffect(() => {
    if (successSingleProductData) {
      setStateDate(singleProductData?.data);
    }
  }, [singleProductData]);

  const onClickHandler = (rIdx) => {
    setStateDate(allProducts?.data[rIdx]);
  };

  //========================================================================================Fetch Data You May Also Like
  // const { data: categoryProducts, isSuccess: successedRandomData } = useQuery(
  //   "categoryProducts",
  //   () => getCategoryProducts("")
  // );

  const {data: allProducts, isSuccess:successedRandomData}=useQuery("allProducts", getAllProducts)
  
  const [stateRandomData, setStateRandomDate] = useState();
  useEffect(() => {
    if (successedRandomData) {
      setStateRandomDate(allProducts?.data);
    }
  }, [allProducts]);

  //========================================================================================set params to a variable
  // const[idParams,setIdParams]=useState(id)
  // useEffect(()=>{
  //   setIdParams(id)
  // },[singleProductData,stateData])

  //========================================================================================set random array id to Fetch random Data
  const [randomIdxs, setRandomIdxs] = useState([]);

  const getRandomIdxs = (max, count) => {
    const idxs = [];
    while (idxs.length < count) {
      const randomIdx = Math.floor(Math.random() * max);
      if (!idxs.includes(randomIdx) && randomIdx !== 2) {
        idxs.push(randomIdx);
      }
    }
    return idxs;
  };

  //===> Generate Random Idx Only one Time //<===
  useEffect(() => {
    const randomIdxs = getRandomIdxs(13, 3);

    setRandomIdxs(randomIdxs);

  }, [stateData]);

  //========================================================================================useState
  const [coverIdx, setCoverIdx] = useState(0);
  //========================================================================================Product Cover Slide Handler
  const imgsIdx = stateData?.images.length - 1; //images length

  const slideLeftHandler = () => {
    coverIdx == 0 ? setCoverIdx(imgsIdx) : setCoverIdx((prev) => prev - 1);
  };
  const slideRightHandler = () => {
    coverIdx >= imgsIdx ? setCoverIdx(0) : setCoverIdx((prev) => prev + 1);
  };

  //========================================================================================handle Share button
  const shareBtnHandler = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link has been copied to clipboard");
  };
  //========================================================================================handle AddToCart Button
  const addToCartHandler = () => {
    Cookies.get("token")
      ? (postProductToCart(stateData, quantity),
        setWishCount((prev) => prev + quantity),
        toast.success("added successfuly"))
      : toast.error("Please Login");
  };

  const buyNowHandler = () => {
    Cookies.get("token")
      ? postProductToCart(stateData, quantity).then(() => {
          setWishCount((prev) => prev + quantity);
          toast.success("added successfuly");
          navigate("/cartlist"), scroll(0, 0);
        })
      : toast.error("Please Login");
  };
  //========================================================================================Quantity Handler
  const [quantity, setQuantity] = useState(1);

  const plusBtn = () => {
    setQuantity((prev) => prev + 1);
  };

  const minusBtn = () => {
    quantity > 1 ? setQuantity((prev) => prev - 1) : null;
  };



  //==============================================================Return===========================================================//
  return (
    <>
      <section className="single-product ">
        <div className="images-container">
          <div className="cover-image">
            {stateData?.images.map((img, idx) => (
              <img
                key={idx}
                src={img ? img : null}
                alt="product image"
                className={idx == coverIdx ? "show" : "hide"}
              />
            ))}
          </div>
          <div className="owl">
            {stateData?.images.map((_, idx) => (
              <div
                key={idx}
                className={`carousel ${
                  coverIdx == idx ? "active-carousel" : null
                }`}
              ></div>
            ))}
          </div>
          <div className="slide-arrows">
            <IoIosArrowDropleftCircle onClick={slideLeftHandler} />
            <IoIosArrowDroprightCircle onClick={slideRightHandler} />
          </div>
        </div>
        <div className="container">
          <section className="section-product-info">
            <div className="main-content-container">
              <div className="main-content">
                <h2>{stateData?.productName}</h2>

                <div className="price">
                  {stateData?.onSale.active ? (
                    <del>EGP {stateData?.price}</del>
                  ) : null}
                  <b>
                    {`EGP ${
                      stateData?.price -
                      (stateData?.onSale.percentage / 100) * stateData?.price
                    }`}
                  </b>
                </div>
                <p>{stateData?.description}</p>
              </div>
              <div className="actions-container">
                <div className="top-widget">
                  <div className="quantity">
                    <AiOutlineMinus onClick={minusBtn} />
                    <p>{quantity}</p>
                    <AiOutlinePlus onClick={plusBtn} />
                  </div>
                  <div className="add-to-cart" onClick={addToCartHandler}>
                    add to cart
                  </div>
                </div>
                <div className="buy-it-now" onClick={buyNowHandler}>
                  buy it now
                </div>
                <div className="tertiary">
                  <div className="share-btn" onClick={shareBtnHandler}>
                    <BsShareFill /> sahre
                  </div>
                  <div
                    className="ask-btn"
                    onClick={() => {
                      navigate("/ask"), scroll(0, 0);
                    }}
                  >
                    <BsQuestionCircle /> ask a question
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <p>{stateData?.details}</p>
            </div>
          </section>
        </div>
      </section>
      <section className="may-also category-page">
        <div className="container">
          <div className="title">
            <h2>you may also like</h2>
          </div>
          <div className="cards-container">
            <div className="cards">
              {stateRandomData &&
                stateRandomData.length > 0 &&
                randomIdxs.map((rIdx, idx) => {
                  const product = stateRandomData?.[rIdx];
                  if (
                    !product ||
                    !product.images ||
                    !product.productName ||
                    !product.price ||
                    !product.onSale ||
                    !product.category ||
                    !product.id
                  ) {
                    return null;
                  }

                  const { images, productName, price, onSale, category, id } =
                    product;

                  const discountedPrice = onSale.active
                    ? price - (onSale.percentage / 100) * price
                    : price;

                  const handleClick = () => {
                    setQuantity(1)
                    navigate(`/shop/${category}/${id}`);
                    scroll(0, 0);
                    onClickHandler(rIdx);
                  };

                  return (
                    <Card
                      key={idx}
                      productImage={images}
                      productName={productName}
                      price={discountedPrice}
                      oldPrice={onSale.active ? price : null}
                      onClick={handleClick}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
