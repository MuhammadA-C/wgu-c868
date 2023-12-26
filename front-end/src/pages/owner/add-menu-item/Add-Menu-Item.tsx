import styles from "./Add-Menu-Item.module.css";
import { useEffect, useState, useRef } from "react";
import MenuItem from "../../../model/MenuItem";

interface IUnsplash {
  url: string | undefined;
}

// Image Options React Component
function ImageOptions({
  setOpenModal,
  setSelectedImage,
  search,
}: {
  setOpenModal: Function;
  setSelectedImage: Function;
  search: string;
}) {
  const [image1, setImage1] = useState<IUnsplash>();
  const [image2, setImage2] = useState<IUnsplash>();
  const [image3, setImage3] = useState<IUnsplash>();

  useEffect(() => {
    // Gets 3 images from the Unsplash API based on the name of the menu item
    fetch(
      `http://api.unsplash.com/search/photos?client_id=${
        import.meta.env.VITE_KEY_UNSPLASH
      }&query=${search}`
    )
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        setImage1({ url: data.results[0].urls.small });
        setImage2({ url: data.results[1].urls.small });
        setImage3({ url: data.results[2].urls.small });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles["image-container"]}>
        <div
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image1?.url)
          }
        >
          <img src={image1?.url} className={styles["image-option"]}></img>
        </div>
        <div
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image2?.url)
          }
        >
          <img src={image2?.url} className={styles["image-option"]}></img>
        </div>
        <div
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image3?.url)
          }
        >
          <img src={image3?.url} className={styles["image-option"]}></img>
        </div>
      </div>
    </>
  );
}

function handleSelectedImage(
  setOpenModal: Function,
  setSelectedImage: Function,
  url: string | undefined
) {
  setSelectedImage(url);
  setOpenModal(false);
}

/////////////////////////////////////////////////////////////////////////////////////////
interface Prop {
  open: boolean;
  setOpenModal: Function;
  setSelectedImage: Function;
  search: string;
}

// Modal React Component
function Modal({ open, setOpenModal, setSelectedImage, search }: Prop) {
  if (!open) {
    return null;
  }
  return (
    <>
      <div className={styles["select-image-modal-container"]}>
        <button
          className={styles["close-modal"]}
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        <ImageOptions
          setOpenModal={setOpenModal}
          setSelectedImage={setSelectedImage}
          search={search}
        />
      </div>
    </>
  );
}

function toggleModal(openModal: boolean, setOpenModal: Function) {
  if (openModal) {
    setOpenModal(false);
  } else {
    setOpenModal(true);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////

// Sets the value to search for the Unsplash API images
function setSearchValue(
  setSearch: Function,
  event: React.ChangeEvent<HTMLInputElement>
) {
  if (event.target.value.trim() != "") {
    setSearch(event.target.value);
  }
}

// Add Menu Item Page React Component
function AddMenuItemPage() {
  /* Select image modal */
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [search, setSearch] = useState("pizza");

  /* Form Input Fields */
  const price = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  /* Error message informing the user they need to fill in all fields prior to hitting submit */
  const [isHidden, setIsHidden] = useState(true);

  /* MenuItem object to add to the database */
  const [addMenuItem, setAddMenuItem] = useState<MenuItem>();

  useEffect(() => {
    // Steps the API call below from running if no menu item is created from the field inputs
    if (addMenuItem == undefined) {
      return;
    }

    // API call to create the menu item
    fetch("http://localhost:3001/api/v1/menu-items", {
      method: "POST",
      body: JSON.stringify({
        name: addMenuItem._name,
        description: addMenuItem._description,
        picture: addMenuItem._picture,
        price: addMenuItem._price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Checks to see if the item was added successfully to take the user back
        if (response.status == 201) {
          window.location.href = "/owner/menu";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [addMenuItem]);

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

    // Sets the item to add to the database which will cause the API call to trigger to add it
    setAddMenuItem(
      new MenuItem(
        name.current.value,
        description.current.value,
        selectedImage,
        Number(price.current.value)
      )
    );
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
        <h2>Add Menu Item</h2>
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
            name="name"
            className={styles["input-fields"]}
          ></input>
          <label htmlFor="price">Price:</label>
          <input
            ref={price}
            type="number"
            min="1"
            max="150"
            step=".01"
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
              onClick={() => (window.location.href = "/owner/menu")}
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

export { AddMenuItemPage };
