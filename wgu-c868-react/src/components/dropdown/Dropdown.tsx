import { useState } from "react";
import styles from "./Dropdown.module.css";

interface Props {
  listItems: string[];
}

//React Component creates each list item
function ListItems({ listItems }: Props) {
  return (
    <>
      <ul className={styles["dropdown-list"]}>
        {listItems.map((item) => (
          <li className={styles["dropdown-item"]} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function Dropdown({ listItems }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  function handleIsVisible() {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }

  return (
    <div>
      <button onClick={handleIsVisible}>Filter</button>
      {isVisible ? <ListItems listItems={listItems} /> : null}
    </div>
  );
}

export default Dropdown;
