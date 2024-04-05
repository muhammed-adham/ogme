import React, { useEffect, useState } from "react";
import {
  TbBox,
  TbCheckupList,
  TbHomeHeart,
  TbTruckDelivery,
} from "react-icons/tb";

/** === Orders Card ===
 * 
 * This component represents an order card
 * it displays details an status information for an order
 * 
 * Usage:
 * - MyOrders Page
 * 
 * Layout:
 * - .card-order-container: the main container for the order card element
 *  - .order-details: Container for order details information
 *    - .info*3: Individual containers for each element detail
 *      - .order-number: Container for the order number
 *      - .total-price: Container for the total price of the order
 *      - .expected-arrival: Container for the expected arrival date of the order 
 *  - .progress-bar: Container for the progress bar
 *    - .progress-bar-fill: The fill element indicating the progress of the order
 *    - .check-marks: Container for the check marks indicating completion of each status
 *      - .check*4: Individual check mark element
 *  - .order-status: Container for order status
 *    - .status-group*4: Individual containers for each order status
 *      - <svg>: icon indicating the status
 *      - <p>: Text for status name
 */ 
const CardOrder = ({processed, ready, out, delivered, orderNumber, orderPrice, arrivalDate}) => {

  //========================================================================================States
  //Order Progress Bar
  const [progress, setProgress] = useState();

  //========================================================================================Variables
  //Current Order Status
  const orderStatus = { 
    processed,
    ready,
    out,
    delivered,
  };

  //========================================================================================Handlers
 //Progress Bar Handler
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
  
  //========================================================================================UseEffect
  //Progress Bar Tracking
  useEffect(() => {
    orderProgressHandler();
  }, [orderStatus]);

  //==================================================================Return======================================================//
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
