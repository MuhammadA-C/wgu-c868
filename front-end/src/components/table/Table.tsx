import MenuItem from "../../model/MenuItem";
import styles from "./Table.module.css";
import { useEffect, useState } from "react";
import LocalStorageKeys from "../../helper/LocalStorageKeys";
import back_end_api_url from "../../helper/Back-End";

/* Table for the Owner Menu Table */
interface Props {
  tableItems: MenuItem[];
  setUpdateTable: Function;
}

function handleSwitchToUpdateItem(itemID: number | undefined) {
  localStorage.setItem(LocalStorageKeys.selected_menu_item_id, String(itemID));
  window.location.href = "/owner/menu/update-menu-item";
}

//React Component creates the table item
function TableItem({
  item,
  itemID,
  setDeleteItem,
}: {
  item: string;
  itemID: number | undefined;
  setDeleteItem: Function;
}) {
  return (
    <div className={styles["table-item-container"]}>
      <p className={styles["table-item"]}>{item}</p>
      <div className={styles["table-buttons-container"]}>
        <button onClick={() => handleSwitchToUpdateItem(itemID)}>Update</button>
        <button
          onClick={() => {
            setDeleteItem(itemID);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

//React Component creates the table
function Table({ tableItems, setUpdateTable }: Props) {
  const [deleteItem, setDeleteItem] = useState(-1);

  useEffect(() => {
    // Stops the API call from being run if no item was selected to delete
    if (deleteItem == -1) {
      return;
    }

    // Calls the API to delete the item from the database
    fetch(`${back_end_api_url}/api/v1/menu-items/${deleteItem}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 204) {
          setUpdateTable("yes");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteItem]);

  return (
    <div className={styles.table}>
      {tableItems.map((item) => (
        <TableItem
          item={item._name}
          key={item._menuItemID}
          itemID={item._menuItemID}
          setDeleteItem={setDeleteItem}
        />
      ))}
    </div>
  );
}

export default Table;
