import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import ContainerCard from '../../../../Components/ContainerCard'
import styles from "./Recent.module.scss";

const RecentCard = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function limit(string = "", limit = 100) {
    return string.substring(0, limit) + "...";
  }

  function limitTitle(string = "", limit = 50) {
    let a;
    if (string.length > limit) {
      a = "...";
    } else {
      a = "";
    }

    return string.substring(0, limit) + a;
  }

  function formatContent(content: any) {
    const paragraphs = content.split(/[\r\n]+/);

    const result = [];

    for (const paragraph of paragraphs) {
      if (paragraph.startsWith("- ")) {
        result.push("  " + paragraph);
      } else {
        result.push(paragraph);
      }
    }

    return result;
  }

  const content = formatContent(props.para);

  return (
    <>
      <div className="">
        <div className={styles.imageHeight}>
          <img width="78%" src={props.image} />
        </div>
        <div className="p-3">
          <div
            style={{
              height: "251px",
              width: "80%",
              marginLeft: "-10px",
              position: "relative",
              top: "-8px",
              boxShadow: "0px 4px 24px 0px #150b7414",
            }}
            className={" border border-2 bg-white p-3  text-start"}
          >
            <h3
              className={
                styles.boldness + " my-2 d-block lh-sm " + styles.maxTruncated
              }
            >
              {limitTitle(props.title)}
            </h3>
            <p className="my-2 fs-6 leading-5">{limit(props.para)}</p>
            <div className={styles.boldness + " my-3"}>
              <button
                // className={"bg-white border-0 text-left p-0" + styles.cardColor}

                className={styles.cardColor}
                onClick={handleShow}
              >
                Read more
              </button>
              <Modal
                dialogClassName="modal-90w"
                show={show}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {" "}
                  {content.map((line, index) => (
                    <p className="pt-4" key={index}>
                      {line}
                    </p>
                  ))}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentCard;
