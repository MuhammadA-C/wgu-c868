import styles from "./Image-Options.module.css";
import { useEffect, useState } from "react";

interface IUnsplash {
  url: string | undefined;
}

function handleSelectedImage(
  setOpenModal: Function,
  setSelectedImage: Function,
  url: string | undefined
) {
  setSelectedImage(url);
  setOpenModal(false);
}

// Image Options React Component //
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

export default ImageOptions;
