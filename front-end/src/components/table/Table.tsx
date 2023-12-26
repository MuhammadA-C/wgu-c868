import MenuItem from "../../model/MenuItem";
import styles from "./Table.module.css";
import { useEffect, useState } from "react";
import SelectedMenuItem from "../../helper/SelectedMenuItem";
import { Link } from "react-router-dom";

interface Props {
  tableItems: MenuItem[];
  setUpdateTable: Function;
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
        <Link to="/owner/menu/update-menu-item">
          <button onClick={() => (SelectedMenuItem.menuItemID = itemID)}>
            Update
          </button>
        </Link>
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
    fetch(`http://localhost:3001/api/v1/menu-items/${deleteItem}`, {
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
