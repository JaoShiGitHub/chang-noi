import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState(
    JSON.parse(localStorage.getItem("deletedOrders")) || []
  );

  const navigate = useNavigate();
  const location = useLocation();

  const style = {
    cursor: "pointer",
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    if (location.state?.deletedOrderKey) {
      const updatedDeletedOrders = [
        ...deletedOrders,
        location.state.deletedOrderKey,
      ];
      setDeletedOrders(updatedDeletedOrders);
      localStorage.setItem(
        "deletedOrders",
        JSON.stringify(updatedDeletedOrders)
      );
    }
  }, [location.state]);

  const getOrder = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:4000/order/history?customer_id=10"
      );
      setOrders(orders.data.items);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  console.log("deletedOrder: ", deletedOrders);

  const handleOrderClick = (key, order) => {
    navigate("/view-order", {
      state: { order, key },
    });
  };

  return (
    <div>
      <h1>HistoryPage</h1>
      {Object.entries(orders).map(([key, order]) => {
        return (
          <button
            style={style}
            key={key}
            onClick={() => handleOrderClick(key, order)}
          >
            <h1>Order: {key}</h1>
            <div>
              {order.map((item) => {
                return (
                  <div key={item.id}>
                    <div>{item.product_name}</div>
                    <span>{item.product_price}</span>
                  </div>
                );
              })}
            </div>
            <span>
              Total:
              {order.reduce((orderAcc, item) => {
                return orderAcc + parseFloat(item.product_price);
              }, 0)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { HistoryPage };
