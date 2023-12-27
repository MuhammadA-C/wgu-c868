import Table from "../../../components/table-2/Table";
import styles from "./Menu.module.css";

function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2>Menu Items</h2>
      </div>
      <Table tableItems={[]}></Table>
    </div>
  );
}

export { MenuPage };
