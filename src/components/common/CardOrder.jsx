import React, { useEffect, useState } from "react";
import {
  TbBox,
  TbCheckupList,
  TbHomeHeart,
  TbTruckDelivery,
} from "react-icons/tb";

const CardOrder = ({processed, ready, out, delivered, orderNumber, orderPrice, arrivalDate}) => {
  const [progress, setProgress] = useState();
  const orderStatus = {
    processed,
    ready,
    out,
    delivered,
  };
  const orderProgressHandler = () => {
    if (orderStatus.delivered ) {
      setProgress(100);
    } else if (orderStatus.out ) {
      setProgress(66);
    } else if (orderStatus.ready ) {
      setProgress(33);
    } else if (orderStatus.processed ) {
      setProgress(0);
    }
  };

  useEffect(() => {
    orderProgressHandler();
  }, [orderStatus]);

  return (
    <>
      <div className="card-order-container">
        <div className="order-details">
          <div className="order-number info">
            <b>Order</b> <p>{orderNumber}</p>
          </div>
          <div className="total-price info">
            <b>Total Price</b> <p>EGP {orderPrice}</p>
          </div>
          <div className="expected-arrival info">
            <b>Expected Arrival</b> <p>{arrivalDate}</p>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="check-marks">
            <div
              className={`processed check ${
                orderStatus.processed ? "process-checked" : null
              }`}
            ></div>
            <div
              className={`ready check ${
                orderStatus.ready ? "process-checked" : null
              }`}
            ></div>
            <div
              className={`out-for-delivery check ${
                orderStatus.out ? "process-checked" : null
              }`}
            ></div>
            <div
              className={`order-arrived check ${
                orderStatus.delivered ? "process-checked" : null
              }`}
            ></div>
          </div>
        </div>
        <div className="order-status">
          <div className="processed check status-group">
            <TbCheckupList />
            <p>Order Processed</p>
          </div>
          <div className="ready check status-group">
            <TbBox />
            <p>Package is Ready</p>
          </div>
          <div className="out-for-delivery check status-group">
            <TbTruckDelivery />
            <p>Out dor Delivery</p>
          </div>
          <div className="order-arrived check status-group">
            <TbHomeHeart />
            <p>Order Arrived</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOrder;
