import styles from "./Modal.module.css";
import ImageOptions from "../image-options/ImageOptions";

interface Prop {
  open: boolean;
  setOpenModal: Function;
  setSelectedImage: Function;
  search: string;
}

// Modal React Component //
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

export default Modal;
