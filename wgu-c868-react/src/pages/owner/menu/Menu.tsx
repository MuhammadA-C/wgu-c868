import FilterDropdown from "../../../components/filter-dropdown/FilterDropDown";
import styles from "./Menu.module.css";

function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <FilterDropdown
          listItems={["Drink", "Desert", "Sea Food", "Pasta"]}
          isVisible={true}
        />
        <h2>Menu Items</h2>
        <button className={styles["add-btn"]}>Add</button>
      </div>
      <div className={styles.table}></div>
    </div>
  );
}

export { MenuPage };
