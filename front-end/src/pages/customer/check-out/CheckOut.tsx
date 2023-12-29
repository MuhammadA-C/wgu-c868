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

function CheckOutPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    let cartKeys: string[];
    const arrayOfMenuItems: MenuItem[] = []; // Will be passed into the setMenuItems
    const cart = JSON.parse(
      sessionStorage.getItem(LocalStorageKeys.customer_cart) || "{}"
    );

    // Skips the code below if no items are in the cart object in session storage
    if (Object.keys(cart).length == 0) {
      return;
    }

    // Gets all keys for the cart object
    cartKeys = Object.keys(cart);

    fetch("http://localhost:3001/api/v1/menu-items")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 204) {
          /* 
            Returning back an empty object when the API returns back a 204 for no data in database.
            This is needed so that the UI updates to display an empty table.
          */
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2 className={styles["table-name"]}>Menu Items</h2>
      </div>
      <Table tableItems={menuItems}></Table>
    </div>
  );
}

export default CheckOutPage;
