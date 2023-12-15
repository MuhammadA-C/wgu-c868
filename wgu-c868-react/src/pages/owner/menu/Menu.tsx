import styles from "./Menu.module.css";

function MenuPage() {
  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}></div>
      <div className={styles.table}></div>
    </div>
  );
}

export { MenuPage };
