import { useState } from "react";
import MenuItem from "../../model/MenuItem";
import styles from "./Table.module.css";
import LocalStorageKeys from "../../helper/LocalStorageKeys";

interface Props {
  tableItems: MenuItem[];
}

function setCountOnPageLoad(itemID: string) {
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
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
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  if (Object.keys(cart).length == 0) {
    // Creates the object and property if it does not exist
    cart[itemID] = 1;
    sessionStorage.setItem(
      LocalStorageKeys.customer_cart,
      JSON.stringify(cart)
    );
  } else if (itemID in cart == false) {
    // Creates the property when it does not exist
    cart[itemID] = 1;
    sessionStorage.setItem(
      LocalStorageKeys.customer_cart,
      JSON.stringify(cart)
    );
  } else {
    // Increases the count when the property exists
    cart[itemID] = cart[itemID] + 1;
    sessionStorage.setItem(
      LocalStorageKeys.customer_cart,
      JSON.stringify(cart)
    );
  }

  const cart2 = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setCount(cart2[itemID]);
}

function decreaseCount(itemID: string, setCount: Function) {
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  // Checks if the cart object exists
  if (Object.keys(cart).length == 0) {
    return;
  }

  // Checks if the property exists in the object
  if (itemID in cart == false) {
    return;
  }

  // Checks if decreasing the count will result in it being less than or equal to 0
  if (cart[itemID] - 1 <= 0) {
    delete cart[itemID]; // deletes the property from the object

    sessionStorage.setItem(
      LocalStorageKeys.customer_cart,
      JSON.stringify(cart)
    ); // Updates the session storage by removing the property

    setCount(0);
    return;
  }

  // Decreases the count by -1 if none of the above checks are true
  cart[itemID] = cart[itemID] - 1;

  sessionStorage.setItem(LocalStorageKeys.customer_cart, JSON.stringify(cart));

  const cart2 = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setCount(cart2[itemID]);
}

//React Component creates the table item
function TableItem({
  item,
  itemID,
  price,
}: {
  item: string;
  itemID: number | undefined;
  price: string;
}) {
  const [count, setCount] = useState(setCountOnPageLoad(String(itemID)));

  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{item}</p>
      <p className={styles["table-item"]}>{`$${price}`}</p>
      <div className={styles["table-buttons-container"]}>
        <button onClick={() => increaseCount(String(itemID), setCount)}>
          +
        </button>
        <h2>{count}</h2>
        <button onClick={() => decreaseCount(String(itemID), setCount)}>
          -
        </button>
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
          price={String(item.price)}
        />
      ))}
    </div>
  );
}

export default Table;
