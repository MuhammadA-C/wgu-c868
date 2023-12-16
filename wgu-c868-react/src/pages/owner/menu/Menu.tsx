import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "../../../components/table/Table";
import styles from "./Menu.module.css";

function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <Dropdown listItems={["Drink", "Desert", "Sea Food", "Pasta"]} />
        <h2>Menu Items</h2>
        <button>Add</button>
      </div>
      <Table
        tableItems={[
          "Pizza",
          "Burger",
          "Salad",
          "Pizza",
          "Burger",
          "Salad",
          "Pizza",
          "Burger",
          "Salad",
        ]}
      ></Table>
    </div>
  );
}

export { MenuPage };
