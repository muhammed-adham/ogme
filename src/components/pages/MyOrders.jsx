import React, { useEffect, useState } from "react";
import CardOrder from "../common/CardOrder";
import { useQuery } from "react-query";
import { getUserOrder } from "../../utils/axiosConfig";

const MyOrders = () => {
  //========================================================================================Get UserOrders
  const [stateUserOrder, setStateUserOrder] = useState();

  const { data: userOrder, isSuccess } = useQuery("userOrder", getUserOrder);

  useEffect(() => {
    if(isSuccess){
      setStateUserOrder(userOrder?.data);
    }
  }, [userOrder]);


  //==========================================================Return=====================================================================

  return (
    <>
      <section className="my-orders-page">
        {stateUserOrder?.toReversed().map((order, idx) => (
          <CardOrder processed={true} key={idx} orderNumber={order.id} orderPrice={order.totalPrice}/>
        ))}
        <CardOrder processed={true} ready={true} out={false} arrivalDate={"11/11/2024"} orderPrice={777}/>
      </section>
    </>
  );
};

export default MyOrders;
