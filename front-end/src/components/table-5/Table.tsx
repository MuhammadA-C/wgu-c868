import styles from "./Table.module.css";
import OrderedItem from "../../model/OrderedItem";

/* React Component creates the table item */
function TableItem({
  orderID,
  name,
  quantity,
  date,
}: {
  orderID: string;
  name: string;
  quantity: number;
  date: string;
}) {
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{orderID}</p>
      <p className={styles["table-item"]}>{name}</p>
      <p className={styles["table-item"]}>{quantity}</p>
      <p className={styles["table-item"]}>{date}</p>
    </div>
  );
}

interface Props {
  tableItems: OrderedItem[];
  date: string;
}

//React Component creates the table
function Table({ tableItems, date }: Props) {
  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem
          orderID={item._orderID}
          name={item._menuItemName}
          quantity={item._quantity}
          date={date}
          key={item._orderedItemID}
        />
      ))}
    </div>
  );
}

export default Table;
