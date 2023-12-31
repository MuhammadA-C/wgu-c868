import styles from "./Table.module.css";
import OrderID from "../../model/OrderID";

//React Component creates the table item
function TableItem({
  orderID,
  status,
  placedDate,
}: {
  orderID: string;
  status: string;
  placedDate: string;
}) {
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{orderID}</p>
      <p className={styles["table-item"]}>{status}</p>
      <p className={styles["table-item"]}>{placedDate}</p>
    </div>
  );
}

interface Props {
  tableItems: OrderID[];
}

//React Component creates the table
function Table({ tableItems }: Props) {
  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem
          orderID={item.orderID}
          key={item._orderID}
          status={item._orderStatus}
          placedDate={item._orderPlacedDate}
        />
      ))}
    </div>
  );
}

export default Table;
