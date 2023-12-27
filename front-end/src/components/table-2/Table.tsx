import { useState } from "react";
import MenuItem from "../../model/MenuItem";
import styles from "./Table.module.css";
import LocalStorageKeys from "../../helper/LocalStorageKeys";

interface Props {
  tableItems: MenuItem[];
}

function setCountOnPageLoad(itemID: string) {
  const cart = JSON.parse(
    localStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  if (Object.keys(cart).length == 0) {
    // Checks if the object is empty
    return 0;
  } else if (itemID in cart == false) {
    // Checks if the property is in the object
    return 0;
  }
  return cart[itemID];
}

function increaseCount(itemID: string, setCount: Function) {
  const cart = JSON.parse(
    localStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  if (Object.keys(cart).length == 0) {
    // Creates the object and property if it does not exist
    cart[itemID] = 1;
    localStorage.setItem(LocalStorageKeys.customer_cart, JSON.stringify(cart));
  } else if (itemID in cart == false) {
    // Creates the property when it does not exist
    cart[itemID] = 1;
    localStorage.setItem(LocalStorageKeys.customer_cart, JSON.stringify(cart));
  } else {
    // Increases the count when the property exists
    cart[itemID] = cart[itemID] + 1;
    localStorage.setItem(LocalStorageKeys.customer_cart, JSON.stringify(cart));
  }

  const cart2 = JSON.parse(
    localStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setCount(cart2[itemID]);
}

//React Component creates the table item
function TableItem({
  item,
  itemID,
}: {
  item: string;
  itemID: number | undefined;
}) {
  const [count, setCount] = useState(setCountOnPageLoad(String(itemID)));

  //localStorage.clear();

  // Need to use local storage to store references to cart items
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{item}</p>
      <div className={styles["table-buttons-container"]}>
        <button onClick={() => increaseCount(String(itemID), setCount)}>
          +
        </button>
        <h2>{count}</h2>
        <button>-</button>
      </div>
    </div>
  );
}

//React Component creates the table
function Table({ tableItems }: Props) {
  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem
          item={item._name}
          key={item._menuItemID}
          itemID={item._menuItemID}
        />
      ))}
    </div>
  );
}

export default Table;
