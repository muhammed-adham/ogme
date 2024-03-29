import React from "react";
import CardOrder from "../common/CardOrder";

const MyOrders = () => {
  return (
    <>
      <section className="my-orders-page">
        <CardOrder processed={true} ready={false} out={false} />
        <CardOrder processed={true} ready={true}/>
      </section>
    </>
  );
};

export default MyOrders;
