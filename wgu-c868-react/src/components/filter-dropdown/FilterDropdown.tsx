import styles from "./FilterDropdown.module.css";

interface Props {
  listItems: string[];
  isVisible?: boolean;
}

//React Component creates each list item
function ListItems({ listItems }: Props) {
  return (
    <>
      <ul className={styles["filter-list"]}>
        {listItems.map((item) => (
          <li className={styles["filter-item"]} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function FilterDropdown({ listItems, isVisible }: Props) {
  return (
    <div>
      <button>Filter</button>
      {isVisible ? <ListItems listItems={listItems} /> : null}
    </div>
  );
}

export default FilterDropdown;
