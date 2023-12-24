import MenuItem from "../../model/MenuItem";
import styles from "./Table.module.css";

interface Props {
  tableItems: MenuItem[];
}

//React Component creates the table item
function TableItem({ item }: { item: string }) {
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{item}</p>
      <div className={styles["table-buttons-container"]}>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

//React Component creates the table
function Table({ tableItems }: Props) {
  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem item={item._name} key={item._menuItemID} />
      ))}
    </div>
  );
}

export default Table;
