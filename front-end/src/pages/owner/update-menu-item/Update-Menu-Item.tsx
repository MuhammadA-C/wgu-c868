import styles from "./Update-Menu-Item.module.css";
import { useEffect, useState, useRef } from "react";
import LocalStorageKeys from "../../../helper/LocalStorageKeys";
import Modal from "../../../components/select-image-modal/Modal";

function toggleModal(openModal: boolean, setOpenModal: Function) {
  if (openModal) {
    setOpenModal(false);
  } else {
    setOpenModal(true);
  }
}

// Sets the value to search for the Unsplash API images
function setSearchValue(
  setSearch: Function,
  event: React.ChangeEvent<HTMLInputElement>
) {
  if (event.target.value.trim() != "") {
    setSearch(event.target.value);
  }
}

function handleCancelBtn() {
  // Need to remove the selected menu item from local storage because it is no longer needed
  localStorage.removeItem(LocalStorageKeys.selected_menu_item_id);
  window.location.href = "/owner/menu";
}

// Update Menu Item Page React Component //
function UpdateMenuItemPage() {
  /* Form Input Fields */
  const price = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  /* Error message informing the user they need to fill in all fields prior to hitting submit */
  const [isHidden, setIsHidden] = useState(true);

  /* Menu Item Properties */
  const [itemPicture, setItemPicture] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemID, setItemID] = useState("");
  const [saveChanges, setSaveChanges] = useState(false); // Triggers the API to update the object

  /* Select image modal */
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [search, setSearch] = useState("pizza");

  useEffect(() => {
    // Gets the menu item for the selected item to update
    fetch(
      `http://localhost:3001/api/v1/menu-items/${localStorage.getItem(
        LocalStorageKeys.selected_menu_item_id
      )}`
    )
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
        throw new Error(
          `Status Code: ${response.status} Text: ${response.statusText}`
        );
      })
      .then((data) => {
        // Creating references to the menu item properties
        setItemID(data.data[0].menu_item_id);
        setItemName(data.data[0].name);
        setItemPicture(data.data[0].picture);
        setItemDescription(data.data[0].description);
        setItemPrice(data.data[0].price);

        // For the image modal
        setSelectedImage(data.data[0].picture);
        setSearch(data.data[0].name); // Search value for the unspalsh API image modal
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Stops the API call below from running from on page load
    if (saveChanges == false) {
      return;
    }

    // API call to update the menu item
    fetch(`http://localhost:3001/api/v1/menu-items/${itemID}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: itemName,
        description: itemDescription,
        picture: itemPicture,
        price: itemPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Checks to see if the item was updated successfully to take the user back
        if (response.status == 200) {
          return (window.location.href = "/owner/menu");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [saveChanges]); // need a new usestate to trigger update

  function handleSubmited() {
    // Checks to see if there are any empty input fields
    if (
      name.current == null ||
      name.current.value == "" ||
      description.current == null ||
      description.current.value == "" ||
      price.current == null ||
      price.current.value == "" ||
      selectedImage == ""
    ) {
      // Shows the error message telling the user to fill in all input fields
      setIsHidden(false);
      return;
    }

    // Updates the menu item object values
    setItemName(name.current.value);
    setItemDescription(description.current.value);
    setItemPicture(selectedImage);
    setItemPrice(price.current.value);

    // Need to remove the selected menu item from local storage because it is no longer needed
    localStorage.removeItem(LocalStorageKeys.selected_menu_item_id);

    // Triggers the API call to update the object
    setSaveChanges(true);
  }

  return (
    <>
      <Modal
        open={openModal}
        setOpenModal={setOpenModal}
        setSelectedImage={setSelectedImage}
        search={search}
      />
      <div className={styles["container"]}>
        <h2>Update Menu Item</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="name">Name:</label>
          <input
            ref={name}
            type="text"
            maxLength={50}
            id="name"
            defaultValue={itemName}
            name="name"
            className={styles["input-fields"]}
            onChange={(e) => setSearchValue(setSearch, e)}
          ></input>
          <label htmlFor="description">Description of item:</label>
          <input
            ref={description}
            type="text"
            maxLength={255}
            id="description"
            name="description"
            defaultValue={itemDescription}
            className={styles["input-fields"]}
          ></input>
          <label htmlFor="price">Price:</label>
          <input
            ref={price}
            type="number"
            min="1"
            max="150"
            step=".01"
            defaultValue={itemPrice}
            id="price"
            name="price"
            className={styles["input-fields"]}
          ></input>
          <div className={styles["selected-image-container"]}>
            <img src={selectedImage} className={styles["selected-image"]}></img>
            <button
              onClick={() => {
                toggleModal(openModal, setOpenModal);
              }}
            >
              Select Image
            </button>
          </div>
          <p>
            <em>
              Note: By default pizza will show for the images <br />
              if you do not enter a name
            </em>
          </p>
          <div className={styles["btn-container"]}>
            <input
              type="submit"
              value="Submit"
              className={styles["submit-btn"]}
              onClick={() => handleSubmited()}
            ></input>
            <button
              className={styles["cancel-btn"]}
              onClick={() => handleCancelBtn()}
            >
              Cancel
            </button>
          </div>
        </form>
        <div hidden={isHidden}>
          <h4>
            Need to fill in all fields and select image prior to clicking submit
          </h4>
        </div>
      </div>
    </>
  );
}

export { UpdateMenuItemPage };
