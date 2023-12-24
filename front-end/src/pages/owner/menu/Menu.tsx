import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "../../../components/table/Table";
import styles from "./Menu.module.css";

fetch("http://localhost:3001/api/v1/menu-items")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.data[0]);
  });

function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <div className={styles["filter-btn"]}>
          <Dropdown listItems={["Drink", "Desert", "Sea Food", "Pasta"]} />
        </div>
        <h2>Menu Items</h2>
        <button className={styles["add-btn"]}>Add</button>
      </div>
      <Table tableItems={["Pizza", "Burger", "Salad"]}></Table>
    </div>
  );
}

export { MenuPage };
