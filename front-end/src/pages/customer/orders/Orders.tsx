import Table from "../../../components/table-4/Table";
import styles from "./Orders.module.css";

function OrdersPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2 className={styles["table-name"]}>Orders</h2>
      </div>
      <Table tableItems={[]}></Table>
    </div>
  );
}

export { OrdersPage };
