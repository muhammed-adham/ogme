import React from "react";
import CardOrder from "../common/CardOrder";

const MyOrders = () => {
  return (
    <>
      <section className="my-orders-page">
        <CardOrder processed={true} ready={true} out={true} />
        <CardOrder processed={true}/>
      </section>
    </>
  );
};

export default MyOrders;
