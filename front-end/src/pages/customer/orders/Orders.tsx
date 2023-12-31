import { useEffect, useState } from "react";

import Table from "../../../components/table-4/Table";
import styles from "./Orders.module.css";
import OrderID from "../../../model/OrderID";
import back_end_api_url from "../../../helper/Back-End";

function OrdersPage() {
  const [orders, setOrders] = useState<OrderID[]>([]);

  useEffect(() => {
    const arrayOfOrderIDs: OrderID[] = [];

    fetch(`${back_end_api_url}/api/v1/order-ids`)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 204) {
          return response.status;
        }
        throw new Error("Error: " + response.statusText);
      })
      .then((data) => {
        if (data == 204) {
          return;
        }

        // Loops through the list of order ids returned from the API call and adds them to a list
        for (let i = 0; i < data.data.length; i++) {
          const order = new OrderID(
            data.data[i].order_id,
            Number(data.data[i].customer_id),
            data.data[i].order_status,
            data.data[i].order_placed_date
          );

          arrayOfOrderIDs.push(order);
        }

        setOrders(arrayOfOrderIDs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2 className={styles["table-name"]}>Orders</h2>
        <div className={styles["columns"]}>
          <h3>Order ID:</h3>
          <h3>Status:</h3>
          <h3>Placed Date:</h3>
        </div>
      </div>
      <Table tableItems={orders}></Table>
    </div>
  );
}

export { OrdersPage };
