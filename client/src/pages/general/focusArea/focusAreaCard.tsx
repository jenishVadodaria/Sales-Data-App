import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import icon from "../../../assets/icons/ic1.png";
import icon2 from "../../../assets/icons/ic2.png";
import icon3 from "../../../assets/icons/ic3.png";
import icon4 from "../../../assets/icons/ic4.png";
import icon5 from "../../../assets/icons/ic5.png";

import styles from "./focusArea.module.scss";

const FocusAreaCard = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const images = [icon, icon2, icon3, icon4, icon5];

  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function handleReadMore() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <>
      <div className={styles.bg + " rounded rounded-3 mx-3"}>
        <div className=" p-3 ">
          <div className="mx-2 my-2">
            <img style={{ height: "48px" }} src={getRandomImage()} />
          </div>
          <div className="mx-2 mt-3 mb-2">
            <h3 className="my-2 fw-bold text-start fs-5">{props.title}</h3>
            <p className="text-start lh-base fs-6 my-2">
              {props.content.length > 300
                ? props.content.substring(0, 300) + " ... "
                : props.content}
              {props.content.length > 300 && (
                <span
                  className=" text-blue-600 cursor-pointer"
                  style={{ color: "#0c6efd" }}
                  onClick={handleReadMore}
                >
                  Read More
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#0c6efd",
              color: "white",
              border: "none",
            }}
            className="btn btn-primary"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FocusAreaCard;
