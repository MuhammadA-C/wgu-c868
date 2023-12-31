import { useEffect, useState } from "react";

import styles from "./Reports.module.css";
import Table from "../../../components/table-5/Table";
import OrderedItem from "../../../model/OrderedItem";

function ReportsPage() {
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);

  useEffect(() => {
    const arrayOfOrderedItems: OrderedItem[] = [];

    fetch("http://localhost:3001/api/v1/ordered-items")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 204) {
          return response.status;
        } else {
          throw new Error("Error: " + response.statusText);
        }
      })
      .then((data) => {
        if (data == 204) {
          return;
        }

        for (let i = 0; i < data.data.length; i++) {
          const orderedItem = new OrderedItem(
            data.data[i].order_id,
            data.data[i].menu_item_name,
            data.data[i].price,
            data.data[i].quantity
          );

          orderedItem._orderedItemID = data.data[i].ordered_item_id;

          arrayOfOrderedItems.push(orderedItem);
        }

        setOrderedItems(arrayOfOrderedItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2 className={styles["table-name"]}>Report</h2>
        <div className={styles["columns"]}>
          <h3>Order ID:</h3>
          <h3>Menu Item:</h3>
          <h3>Quantity:</h3>
          <h3>Report Generated Date:</h3>
        </div>
      </div>
      <Table tableItems={orderedItems} date={new Date().toJSON()}></Table>
    </div>
  );
}

export default ReportsPage;
