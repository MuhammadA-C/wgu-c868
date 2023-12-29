import { useEffect, useState } from "react";
import MenuItem from "../../../model/MenuItem";
import styles from "./CheckOut.module.css";
import Table from "../../../components/table-3/Table";
import LocalStorageKeys from "../../../helper/LocalStorageKeys";

interface IMenuItemJSON {
  status: string;
  results: number;
  data: Array<IMenuItem>;
}

interface IMenuItem {
  menu_item_id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
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

function CheckOutPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [updateTable, setUpdateTable] = useState("");
  const [totalItems, setTotalItems] = useState(getTotalItemsInCart());
  const [subTotal, setSubTotal] = useState("0");
  const cart = JSON.parse(
    sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
  );

  useEffect(() => {
    let cartKeys: string[];
    const arrayOfMenuItems: MenuItem[] = []; // Will be passed into the setMenuItems

    // Skips the code below if no items are in the cart object in session storage
    if (Object.keys(cart).length == 0) {
      setMenuItems([]); // Need to set the menu items to an empty array when no items are in the cart
      return;
    }

    // Gets all keys for the cart object
    cartKeys = Object.keys(cart);

    fetch("http://localhost:3001/api/v1/menu-items")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 204) {
          // Returns an empty object when the API returns back a 204 for no data in database.
          let data: IMenuItemJSON = {
            status: String(response.status),
            results: 0,
            data: [],
          };

          return data;
        }
        throw new Error("Status Code: " + response.status);
      })
      .then((data: IMenuItemJSON) => {
        // Loops through each menu item object returned from the database
        for (let i = 0; i < data.data.length; i++) {
          // Loops through each key in the cart object
          for (let j = 0; j < cartKeys.length; j++) {
            // Skips if the menu item id from the database does not match the key in the cart object
            if (data.data[i].menu_item_id != Number(cartKeys[j])) {
              continue;
            }

            // Destructering the object to get the properties
            const { menu_item_id, name, description, picture, price } =
              data.data[i];

            const menuItemObj = new MenuItem(name, description, picture, price);
            menuItemObj._menuItemID = menu_item_id;

            arrayOfMenuItems.push(menuItemObj);
          }
        }
        setMenuItems(arrayOfMenuItems);
        setSubTotal(String(getSubTotal(arrayOfMenuItems)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateTable]);

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <div className={styles["table-nav"]}>
          <h2 className={styles["table-name"]}>Total Items: {totalItems}</h2>
        </div>
        <Table
          tableItems={menuItems}
          setUpdateTable={setUpdateTable}
          setTotalItems={setTotalItems}
          setSubTotal={setSubTotal}
        ></Table>
      </div>
      <div className={styles["summary-container"]}>
        <h3>Subtotal: ${subTotal}</h3>
        <h3>Fees & Estimated Taxes: $0.0</h3>
        <h3>Total: ${subTotal}</h3>
        <button>Order</button>
      </div>
    </div>
  );
}

export default CheckOutPage;
