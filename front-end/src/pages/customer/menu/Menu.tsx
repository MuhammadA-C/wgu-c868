import { useEffect, useState, useRef } from "react";
import MenuItem from "../../../model/MenuItem";
import Table from "../../../components/table-2/Table";
import styles from "./Menu.module.css";

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

// React Menu Page Component //
function MenuPage() {
  const [copyOfMenuItems, setCopyOfMenuItems] = useState<MenuItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const search = useRef<HTMLInputElement>(null);

  function handleSearch() {
    const filteredList: MenuItem[] = [];

    for (let i = 0; i < copyOfMenuItems.length; i++) {
      // Adds any items that contain matching characters to an array
      if (copyOfMenuItems[i]._name.includes(search.current?.value || "")) {
        filteredList.push(copyOfMenuItems[i]);
      }
    }

    // Sets the table view to show the filtered list of menu items
    return setMenuItems(filteredList);
  }

  useEffect(() => {
    const arrayOfMenuItems: MenuItem[] = []; // Will be passed into the setMenuItems

    // API call to get the menu items
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
        for (let i = 0; i < data.data.length; i++) {
          // Destructering the object to get the properties
          const { menu_item_id, name, description, picture, price } =
            data.data[i];

          const menuItemObj = new MenuItem(name, description, picture, price);
          menuItemObj._menuItemID = menu_item_id;

          arrayOfMenuItems.push(menuItemObj);
        }
        setMenuItems(arrayOfMenuItems);
        setCopyOfMenuItems(arrayOfMenuItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2 className={styles["table-name"]}>Menu Items</h2>
        <div>
          <input
            ref={search}
            type="text"
            placeholder={"Search"}
            id="search"
            name="search"
            maxLength={50}
            className={styles["search-bar"]}
            onInput={() => handleSearch()}
          ></input>
        </div>
      </div>
      <Table tableItems={menuItems}></Table>
    </div>
  );
}

export { MenuPage };
