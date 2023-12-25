import styles from "./Add-Menu-Item.module.css";
import { useEffect, useState } from "react";

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
        <a
          href="#"
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image1?.url)
          }
        >
          <img src={image1?.url} className={styles["image-option"]}></img>
        </a>
        <a
          href="#"
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image2?.url)
          }
        >
          <img src={image2?.url} className={styles["image-option"]}></img>
        </a>
        <a
          href="#"
          onClick={() =>
            handleSelectedImage(setOpenModal, setSelectedImage, image3?.url)
          }
        >
          <img src={image3?.url} className={styles["image-option"]}></img>
        </a>
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

function handleSubmited() {
  // Add code here to get user input and submit to the back end via API call
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [search, setSearch] = useState("pizza");

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
            type="text"
            id="name"
            name="name"
            className={styles["input-fields"]}
            onChange={(e) => setSearchValue(setSearch, e)}
          ></input>
          <label htmlFor="description">Description of item:</label>
          <input
            type="text"
            id="description"
            name="name"
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
          <div className={styles["btn-container"]}>
            <input
              type="submit"
              value="Submit"
              className={styles["submit-btn"]}
              onClick={() => (window.location.href = "/owner/menu")}
            ></input>
            <button
              className={styles["cancel-btn"]}
              onClick={() => (window.location.href = "/owner/menu")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { AddMenuItemPage };
