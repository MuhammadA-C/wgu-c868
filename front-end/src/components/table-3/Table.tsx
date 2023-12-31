import { useState } from "react";
import LocalStorageKeys from "../../helper/LocalStorageKeys";
import styles from "./Table.module.css";
import MenuItem from "../../model/MenuItem";

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

function getTotalItemsInCart(): number {
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  if (Object.keys(cart).length == 0) {
    return 0;
  }

  const values = Object.values(cart);
  let total = 0;

  for (let i = 0; i < values.length; i++) {
    total += Number(values[i]);
  }

  return total;
}

function getSubTotal(menuItems: MenuItem[]): number {
  let subTotal = 0;
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  if (Object.keys(cart).length == 0) {
    return subTotal;
  }

  for (let i = 0; i < menuItems.length; i++) {
    let price: number = menuItems[i].price;
    let count: number = cart[String(menuItems[i]._menuItemID)];

    subTotal += price * count;
  }

  return Number(subTotal.toFixed(2)); // Limits the number to only having 2 decimal places max
}

function increaseCount(
  itemID: string,
  setCount: Function,
  setTotalItems: Function,
  price: String,
  menuItems: MenuItem[],
  setOrderLimitMessage: Function
) {
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
  } else if (getSubTotal(menuItems) + Number(price) > 1000) {
    setOrderLimitMessage(false);
    return; // Limits the subtotal of all items to $1,000
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

  setOrderLimitMessage(true);

  const cart2 = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setCount(cart2[itemID]);
  setTotalItems(getTotalItemsInCart());
}

function decreaseCount(
  itemID: string,
  setCount: Function,
  setUpdateTable: Function,
  setTotalItems: Function,
  setOrderLimitMessage: Function
) {
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setOrderLimitMessage(true);

  // Checks if the cart object exists
  if (Object.keys(cart).length == 0) {
    setTotalItems(getTotalItemsInCart());
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

    setUpdateTable(`${itemID}`);
    setTotalItems(getTotalItemsInCart());
    return;
  }

  // Decreases the count by -1 if none of the above checks are true
  cart[itemID] = cart[itemID] - 1;

  sessionStorage.setItem(LocalStorageKeys.customer_cart, JSON.stringify(cart));

  const cart2 = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  setCount(cart2[itemID]);
  setTotalItems(getTotalItemsInCart());
}

//React Component creates the table item
function TableItem({
  item,
  itemID,
  price,
  setUpdateTable,
  setTotalItems,
  setSubTotal,
  menuItems,
  setOrderLimitMessage,
}: {
  item: string;
  itemID: number | undefined;
  price: string;
  setUpdateTable: Function;
  setTotalItems: Function;
  setSubTotal: Function;
  menuItems: MenuItem[];
  setOrderLimitMessage: Function;
}) {
  const [count, setCount] = useState(setCountOnPageLoad(String(itemID)));

  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{item}</p>
      <p className={styles["table-item"]}>{`$${price}`}</p>
      <div className={styles["table-buttons-container"]}>
        <button
          onClick={() => {
            increaseCount(
              String(itemID),
              setCount,
              setTotalItems,
              price,
              menuItems,
              setOrderLimitMessage
            );
            setSubTotal(getSubTotal(menuItems));
          }}
        >
          +
        </button>
        <h2>{count}</h2>
        <button
          onClick={() => {
            decreaseCount(
              String(itemID),
              setCount,
              setUpdateTable,
              setTotalItems,
              setOrderLimitMessage
            );
            setSubTotal(getSubTotal(menuItems));
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

interface Props {
  tableItems: MenuItem[];
  setUpdateTable: Function;
  setTotalItems: Function;
  setSubTotal: Function;
  setOrderLimitMessage: Function;
}

//React Component creates the table
function Table({
  tableItems,
  setUpdateTable,
  setTotalItems,
  setSubTotal,
  setOrderLimitMessage,
}: Props) {
  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem
          item={item._name}
          key={item._menuItemID}
          itemID={item._menuItemID}
          price={String(item.price)}
          setUpdateTable={setUpdateTable}
          setTotalItems={setTotalItems}
          setSubTotal={setSubTotal}
          menuItems={tableItems}
          setOrderLimitMessage={setOrderLimitMessage}
        />
      ))}
    </div>
  );
}

export default Table;
