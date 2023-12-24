import Table from "../../../components/table/Table";
import styles from "./Menu.module.css";
import MenuItem from "../../../model/MenuItem";
import { useEffect, useState } from "react";

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

function MenuPage() {
  const arrayOfMenuItems: MenuItem[] = []; // Will be passed into the setMenuItems
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // API call to get the menu items
    fetch("http://localhost:3001/api/v1/menu-items")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <div className={styles["filter-btn"]}></div>
        <h2>Menu Items</h2>
        <button className={styles["add-btn"]}>Add</button>
      </div>
      <Table tableItems={menuItems}></Table>
    </div>
  );
}

export { MenuPage };

/*
  //Removed the filter drop down because may not add it to the project anymore
    <Dropdown listItems={["Drink", "Desert", "Sea Food", "Pasta"]} />

*/
