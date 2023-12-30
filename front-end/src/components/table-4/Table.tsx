import styles from "./Table.module.css";

//React Component creates the table item
function TableItem({ orderID }: { orderID: string }) {
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{orderID}</p>
      <div className={styles["table-buttons-container"]}></div>
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
        <TableItem orderID={item._orderID} key={item._orderID} />
      ))}
    </div>
  );
}

export default Table;
